#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, Vec};

mod test;

#[contract]
pub struct CheckerContract;

#[contractimpl]
impl CheckerContract {
    pub fn initialize(_env: Env) {
        // No owner needed anymore
    }

    pub fn is_valid(env: Env, protocol_id: String, user: Address, amount: i128) -> (bool, u32) {
        // Check blacklist (common for all protocols)
        if env.storage().instance().get::<_, bool>(&("blacklist", user.clone())).unwrap_or(false) {
            env.events().publish(("ValidationFailed", protocol_id.clone(), user.clone(), 100), "blacklisted");
            return (false, 100);
        }

        // Check protocol-specific max amount policy (only if enabled)
        let max_policy_key = ("policy_max", protocol_id.clone());
        if let Some((max_amount, enabled)) = env.storage().instance().get::<_, (i128, bool)>(&max_policy_key) {
            if enabled && amount > max_amount {
                env.events().publish(("ValidationFailed", protocol_id.clone(), user.clone(), 200), "amount_exceeded");
                return (false, 200);
            }
        }

        // Check protocol-specific min amount policy (only if enabled)
        let min_policy_key = ("policy_min", protocol_id.clone());
        if let Some((min_amount, enabled)) = env.storage().instance().get::<_, (i128, bool)>(&min_policy_key) {
            if enabled && amount < min_amount {
                env.events().publish(("ValidationFailed", protocol_id.clone(), user.clone(), 300), "amount_below_minimum");
                return (false, 300);
            }
        }

        env.events().publish(("ValidationPassed", protocol_id, user), "ok");
        (true, 0)
    }

    pub fn add_to_blacklist(env: Env, user: Address) {
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

    pub fn create_max_amount_policy(env: Env, protocol_id: String, max_amount: i128) {
        env.storage().instance().set(&("policy_max", protocol_id.clone()), &(max_amount, true));
        env.events().publish(("PolicyMaxUpdated", protocol_id), max_amount);
    }

    pub fn create_min_amount_policy(env: Env, protocol_id: String, min_amount: i128) {
        env.storage().instance().set(&("policy_min", protocol_id.clone()), &(min_amount, true));
        env.events().publish(("PolicyMinUpdated", protocol_id), min_amount);
    }

    pub fn enable_max_amount_policy(env: Env, protocol_id: String) {
        if let Some((amount, _)) = env.storage().instance().get::<_, (i128, bool)>(&("policy_max", protocol_id.clone())) {
            env.storage().instance().set(&("policy_max", protocol_id.clone()), &(amount, true));
            env.events().publish(("PolicyMaxEnabled", protocol_id), true);
        }
    }

    pub fn disable_max_amount_policy(env: Env, protocol_id: String) {
        if let Some((amount, _)) = env.storage().instance().get::<_, (i128, bool)>(&("policy_max", protocol_id.clone())) {
            env.storage().instance().set(&("policy_max", protocol_id.clone()), &(amount, false));
            env.events().publish(("PolicyMaxEnabled", protocol_id), false);
        }
    }

    pub fn enable_min_amount_policy(env: Env, protocol_id: String) {
        if let Some((amount, _)) = env.storage().instance().get::<_, (i128, bool)>(&("policy_min", protocol_id.clone())) {
            env.storage().instance().set(&("policy_min", protocol_id.clone()), &(amount, true));
            env.events().publish(("PolicyMinEnabled", protocol_id), true);
        }
    }

    pub fn disable_min_amount_policy(env: Env, protocol_id: String) {
        if let Some((amount, _)) = env.storage().instance().get::<_, (i128, bool)>(&("policy_min", protocol_id.clone())) {
            env.storage().instance().set(&("policy_min", protocol_id.clone()), &(amount, false));
            env.events().publish(("PolicyMinEnabled", protocol_id), false);
        }
    }

    // Getter functions

    pub fn get_blacklist(env: Env) -> Vec<Address> {
        env.storage().instance().get(&"blacklist_array").unwrap_or(Vec::new(&env))
    }

    pub fn is_blacklisted(env: Env, user: Address) -> bool {
        env.storage().instance().get::<_, bool>(&("blacklist", user)).unwrap_or(false)
    }

    pub fn get_max_amount_policy(env: Env, protocol_id: String) -> Option<(i128, bool)> {
        env.storage().instance().get::<_, (i128, bool)>(&("policy_max", protocol_id))
    }

    pub fn get_min_amount_policy(env: Env, protocol_id: String) -> Option<(i128, bool)> {
        env.storage().instance().get::<_, (i128, bool)>(&("policy_min", protocol_id))
    }
}
