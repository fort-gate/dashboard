use soroban_sdk::{contractclient, contracttype, Address, Env, Vec, Map};

/// Request type for Blend operations
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Request {
    // Add the fields that the Blend contract expects
    // These are placeholder fields - you'll need to adjust based on actual Blend interface
    pub request_type: u32,
    pub address: Address,
    pub amount: i128,
}

/// Positions type returned by Blend
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Positions {
    pub liabilities: Map<u32, i128>, // Map of Reserve Index to liability share balance
    pub collateral: Map<u32, i128>,  // Map of Reserve Index to collateral supply share balance
    pub supply: Map<u32, i128>,      // Map of Reserve Index to non-collateral supply share balance
}

/// Interface for the Blend contract
#[contractclient(name = "BlendContractClient")]
pub trait BlendContract {
    /// Submit requests to the Blend protocol
    fn submit(env: Env, from: Address, spender: Address, to: Address, requests: Vec<Request>) -> Positions;
}