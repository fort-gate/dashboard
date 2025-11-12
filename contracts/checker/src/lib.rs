#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, Vec};

mod test;

#[contract]
pub struct CheckerContract;

#[contractimpl]
impl CheckerContract {
    pub fn initialize(env: Env, owner: Address) {
        env.storage().instance().set(&"owner", &owner);
    }

    pub fn is_valid(env: Env, protocol_id: String, user: Address, amount: i128) -> (bool, u32) {
        // Check blacklist (common for all protocols)
        if env.storage().instance().get::<_, bool>(&("blacklist", user.clone())).unwrap_or(false) {
            env.events().publish(("ValidationFailed", protocol_id.clone(), user.clone(), 100), "blacklisted");
            return (false, 100);
        }

        // Check protocol-specific policy (only if policy exists for the protocol)
        let policy_key = ("policy", protocol_id.clone());
        if let Some(max_amount) = env.storage().instance().get::<_, i128>(&policy_key) {
            if amount > max_amount {
                env.events().publish(("ValidationFailed", protocol_id.clone(), user.clone(), 200), "amount_exceeded");
                return (false, 200);
            }
        }

        env.events().publish(("ValidationPassed", protocol_id, user), "ok");
        (true, 0)
    }

    pub fn add_to_blacklist(env: Env, user: Address) {
        let owner: Address = env.storage().instance().get(&"owner").unwrap();
        owner.require_auth();
        
        // Add to blacklist status
        env.storage().instance().set(&("blacklist", user.clone()), &true);
        
        // Maintain blacklist array for efficient querying
        let mut blacklist_array: Vec<Address> = env.storage().instance()
            .get(&"blacklist_array").unwrap_or(Vec::new(&env));
        
        // Add if not already present
        if !blacklist_array.iter().any(|addr| addr == user) {
            blacklist_array.push_back(user.clone());
            env.storage().instance().set(&"blacklist_array", &blacklist_array);
        }
        
        env.events().publish(("BlacklistUpdated", user), true);
    }

    pub fn remove_from_blacklist(env: Env, user: Address) {
        let owner: Address = env.storage().instance().get(&"owner").unwrap();
        owner.require_auth();
        
        // Remove from blacklist status
        env.storage().instance().remove(&("blacklist", user.clone()));
        
        // Remove from blacklist array
        let blacklist_array: Vec<Address> = env.storage().instance()
            .get(&"blacklist_array").unwrap_or(Vec::new(&env));
        
        // Find and remove the address
        let mut new_array = Vec::new(&env);
        for addr in blacklist_array.iter() {
            if addr != user {
                new_array.push_back(addr);
            }
        }
        env.storage().instance().set(&"blacklist_array", &new_array);
        
        env.events().publish(("BlacklistUpdated", user), false);
    }

    pub fn create_policy(env: Env, protocol_id: String, max_amount: i128) {
        let owner: Address = env.storage().instance().get(&"owner").unwrap();
        owner.require_auth();
        env.storage().instance().set(&("policy", protocol_id.clone()), &max_amount);
        env.events().publish(("PolicyUpdated", protocol_id), max_amount);
    }

    // Getter functions
    pub fn get_owner(env: Env) -> Address {
        env.storage().instance().get(&"owner").unwrap()
    }

    pub fn get_blacklist(env: Env) -> Vec<Address> {
        env.storage().instance().get(&"blacklist_array").unwrap_or(Vec::new(&env))
    }

    pub fn is_blacklisted(env: Env, user: Address) -> bool {
        env.storage().instance().get::<_, bool>(&("blacklist", user)).unwrap_or(false)
    }

    pub fn get_policy(env: Env, protocol_id: String) -> Option<i128> {
        env.storage().instance().get::<_, i128>(&("policy", protocol_id))
    }
}
