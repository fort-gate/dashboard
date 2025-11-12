use soroban_sdk::{contractclient, Address, Env, String};

/// Interface for the CheckerContract
#[contractclient(name = "CheckerContractClient")]
pub trait CheckerContract {
    /// Validates a transaction against blacklist and protocol-specific policies
    /// If no policy exists for the protocol, only blacklist is checked (no amount validation)
    /// Returns (is_valid: bool, error_code: u32)
    fn is_valid(env: Env, protocol_id: String, user: Address, amount: i128) -> (bool, u32);
}