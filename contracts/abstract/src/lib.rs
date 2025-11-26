#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Env, String, Address, Vec};

// Import the CheckerContract interface
mod checker;
use crate::checker::CheckerContractClient;

// Import the BlendContract interface
mod blend;
use crate::blend::{BlendContractClient, Request, Positions};

/// Result type for check_and_submit function
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum CheckResult {
    Success(Positions),
    ValidationFailed(u32),
}

#[contract]
pub struct AbstractContract;

#[contractimpl]
impl AbstractContract {
    /// Check function that validates user and amount, and if valid, submits to Blend
    /// Returns CheckResult::Success(Positions) if successful, or CheckResult::ValidationFailed(error_code) if validation fails
    pub fn submit(
        env: Env, 
        from: Address,
        spender: Address,
        to: Address,
        requests: Vec<Request>
    ) -> CheckResult {
        spender.require_auth();

        let protocol_id = String::from_str(&env, "blend_protocol");
    
        // The hardcoded address of the checker contract
        let checker_address = Address::from_str(&env, "CDR77FU73UHXJMAVIUSEA2OI6T4R5XYA7BZTILRBKMIJOAUR3CVM7NIT");
        
        // Create a client to interface with the checker contract
        let checker_client = CheckerContractClient::new(&env, &checker_address);
        
        // Call the is_valid function on the checker contract
        let first_request = requests.get(0).unwrap();
        let (is_valid, error_code) = checker_client.is_valid(&protocol_id, &from, &first_request.amount);
        
        if !is_valid {
            return CheckResult::ValidationFailed(error_code);
        }
        
        // If validation passes, call the Blend contract
        let blend_address = Address::from_str(&env, "CDDG7DLOWSHRYQ2HWGZEZ4UTR7LPTKFFHN3QUCSZEXOWOPARMONX6T65");
        let blend_client = BlendContractClient::new(&env, &blend_address);
        
        // Call submit on the Blend contract with correct parameter order
        let positions = blend_client.submit(&from, &spender, &to, &requests);
        
        CheckResult::Success(positions)
    }
    
    /// Simple check function that only validates (backwards compatibility)
    pub fn check(env: Env, protocol_id: String, user: Address, amount: i128) -> (bool, u32) {
        // The hardcoded address of the checker contract
        let checker_address = Address::from_str(&env, "CDR77FU73UHXJMAVIUSEA2OI6T4R5XYA7BZTILRBKMIJOAUR3CVM7NIT");
        
        // Create a client to interface with the checker contract
        let checker_client = CheckerContractClient::new(&env, &checker_address);
        
        // Call the is_valid function on the checker contract
        checker_client.is_valid(&protocol_id, &user, &amount)
    }
}

mod test;
