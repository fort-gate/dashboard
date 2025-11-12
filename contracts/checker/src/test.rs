#![cfg(test)]

use super::*;
use soroban_sdk::{Env, String, Address, IntoVal, testutils::{Address as _, MockAuth, MockAuthInvoke}};

#[test]
fn test_protocol_specific_policies() {
    let env = Env::default();
    let contract_id = env.register(CheckerContract, ());
    let client = CheckerContractClient::new(&env, &contract_id);
    
    let owner = Address::generate(&env);
    let user = Address::generate(&env);
    
    // Initialize contract
    client.initialize(&owner);
    
    let protocol_a = String::from_str(&env, "protocol_a");
    let protocol_b = String::from_str(&env, "protocol_b");
    
    // Create different policies for each protocol (applies to all users)
    client.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "create_policy",
            args: (protocol_a.clone(), 1000_i128).into_val(&env),
            sub_invokes: &[],
        },
    }]).create_policy(&protocol_a, &1000_i128);
    
    client.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "create_policy",
            args: (protocol_b.clone(), 500_i128).into_val(&env),
            sub_invokes: &[],
        },
    }]).create_policy(&protocol_b, &500_i128);
    
    // Test validation with different protocols
    // Protocol A allows up to 1000
    let (valid_a, _) = client.is_valid(&protocol_a, &user, &800);
    assert!(valid_a);
    
    let (invalid_a, code_a) = client.is_valid(&protocol_a, &user, &1200);
    assert!(!invalid_a);
    assert_eq!(code_a, 200);
    
    // Protocol B allows up to 500
    let (valid_b, _) = client.is_valid(&protocol_b, &user, &400);
    assert!(valid_b);
    
    let (invalid_b, code_b) = client.is_valid(&protocol_b, &user, &600);
    assert!(!invalid_b);
    assert_eq!(code_b, 200);
}

#[test]
fn test_common_blacklist() {
    let env = Env::default();
    let contract_id = env.register(CheckerContract, ());
    let client = CheckerContractClient::new(&env, &contract_id);
    
    let owner = Address::generate(&env);
    let user = Address::generate(&env);
    
    // Initialize contract
    client.initialize(&owner);
    
    let protocol_a = String::from_str(&env, "protocol_a");
    let protocol_b = String::from_str(&env, "protocol_b");
    
    // Add user to blacklist
    client.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "add_to_blacklist",
            args: (user.clone(),).into_val(&env),
            sub_invokes: &[],
        },
    }]).add_to_blacklist(&user);
    
    // Test that blacklist affects both protocols
    let (invalid_a, code_a) = client.is_valid(&protocol_a, &user, &100);
    assert!(!invalid_a);
    assert_eq!(code_a, 100);
    
    let (invalid_b, code_b) = client.is_valid(&protocol_b, &user, &100);
    assert!(!invalid_b);
    assert_eq!(code_b, 100);
}

#[test]
fn test_getter_functions() {
    let env = Env::default();
    let contract_id = env.register(CheckerContract, ());
    let client = CheckerContractClient::new(&env, &contract_id);
    
    let owner = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);
    
    // Initialize contract
    client.initialize(&owner);
    
    // Test get_owner
    let contract_owner = client.get_owner();
    assert_eq!(contract_owner, owner);
    
    let protocol_a = String::from_str(&env, "protocol_a");
    
    // Test get_blacklist (initially empty)
    let blacklist = client.get_blacklist();
    assert_eq!(blacklist.len(), 0);
    
    // Add users to blacklist
    client.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "add_to_blacklist",
            args: (user1.clone(),).into_val(&env),
            sub_invokes: &[],
        },
    }]).add_to_blacklist(&user1);
    
    client.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "add_to_blacklist",
            args: (user2.clone(),).into_val(&env),
            sub_invokes: &[],
        },
    }]).add_to_blacklist(&user2);
    
    // Test get_blacklist
    let blacklist = client.get_blacklist();
    assert_eq!(blacklist.len(), 2);
    assert!(blacklist.contains(&user1));
    assert!(blacklist.contains(&user2));
    
    // Test is_blacklisted
    assert!(client.is_blacklisted(&user1));
    assert!(client.is_blacklisted(&user2));
    
    // Test get_policy (no policy set)
    let policy = client.get_policy(&protocol_a);
    assert!(policy.is_none());
    
    // Create a policy for the protocol
    client.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "create_policy",
            args: (protocol_a.clone(), 1000_i128).into_val(&env),
            sub_invokes: &[],
        },
    }]).create_policy(&protocol_a, &1000_i128);
    
    // Test get_policy (policy set)
    let policy = client.get_policy(&protocol_a);
    assert_eq!(policy, Some(1000));
    
    // Remove user from blacklist
    client.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "remove_from_blacklist",
            args: (user1.clone(),).into_val(&env),
            sub_invokes: &[],
        },
    }]).remove_from_blacklist(&user1);
    
    // Test blacklist after removal
    let blacklist = client.get_blacklist();
    assert_eq!(blacklist.len(), 1);
    assert!(!blacklist.contains(&user1));
    assert!(blacklist.contains(&user2));
    assert!(!client.is_blacklisted(&user1));
    assert!(client.is_blacklisted(&user2));
}

#[test]
fn test_no_policy_no_amount_validation() {
    let env = Env::default();
    let contract_id = env.register(CheckerContract, ());
    let client = CheckerContractClient::new(&env, &contract_id);
    
    let owner = Address::generate(&env);
    let user = Address::generate(&env);
    
    // Initialize contract
    client.initialize(&owner);
    
    let protocol_without_policy = String::from_str(&env, "no_policy_protocol");
    
    // Test that without policy, any amount should be valid (no amount validation)
    let (valid_large, _) = client.is_valid(&protocol_without_policy, &user, &999999999);
    assert!(valid_large); // Should pass because no policy exists
    
    let (valid_small, _) = client.is_valid(&protocol_without_policy, &user, &1);
    assert!(valid_small); // Should pass because no policy exists
    
    // Now create a policy for this protocol
    client.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "create_policy",
            args: (protocol_without_policy.clone(), 1000_i128).into_val(&env),
            sub_invokes: &[],
        },
    }]).create_policy(&protocol_without_policy, &1000_i128);
    
    // Now with policy, amounts should be validated
    let (valid_within_limit, _) = client.is_valid(&protocol_without_policy, &user, &800);
    assert!(valid_within_limit); // Should pass, within limit
    
    let (invalid_over_limit, code) = client.is_valid(&protocol_without_policy, &user, &1500);
    assert!(!invalid_over_limit); // Should fail, over limit
    assert_eq!(code, 200); // Amount exceeded error
}
