import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from '@stellar/stellar-sdk/contract';
import type { u32, i128, Option } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly standalone: {
        readonly networkPassphrase: "Standalone Network ; February 2017";
        readonly contractId: "CAU3ILLIV3E4DUWVW6WNX76T5DGSYW6RUULNORCM5J3T6KZHJR6L4HT4";
    };
};
export type DataKey = {
    tag: "Owner";
    values: void;
};
/**
 * Storage keys for the data associated with the allowlist extension
 */
export type AllowListStorageKey = {
    tag: "Allowed";
    values: readonly [string];
};
/**
 * Storage keys for the data associated with the blocklist extension
 */
export type BlockListStorageKey = {
    tag: "Blocked";
    values: readonly [string];
};
/**
 * Storage key that maps to [`AllowanceData`]
 */
export interface AllowanceKey {
    owner: string;
    spender: string;
}
/**
 * Storage container for the amount of tokens for which an allowance is granted
 * and the ledger number at which this allowance expires.
 */
export interface AllowanceData {
    amount: i128;
    live_until_ledger: u32;
}
/**
 * Storage keys for the data associated with `FungibleToken`
 */
export type StorageKey = {
    tag: "TotalSupply";
    values: void;
} | {
    tag: "Balance";
    values: readonly [string];
} | {
    tag: "Allowance";
    values: readonly [AllowanceKey];
};
/**
 * Storage container for token metadata
 */
export interface Metadata {
    decimals: u32;
    name: string;
    symbol: string;
}
/**
 * Storage key for accessing the SAC address
 */
export type SACAdminGenericDataKey = {
    tag: "Sac";
    values: void;
};
/**
 * Storage key for accessing the SAC address
 */
export type SACAdminWrapperDataKey = {
    tag: "Sac";
    values: void;
};
export declare const FungibleTokenError: {
    /**
     * Indicates an error related to the current balance of account from which
     * tokens are expected to be transferred.
     */
    100: {
        message: string;
    };
    /**
     * Indicates a failure with the allowance mechanism when a given spender
     * doesn't have enough allowance.
     */
    101: {
        message: string;
    };
    /**
     * Indicates an invalid value for `live_until_ledger` when setting an
     * allowance.
     */
    102: {
        message: string;
    };
    /**
     * Indicates an error when an input that must be >= 0
     */
    103: {
        message: string;
    };
    /**
     * Indicates overflow when adding two values
     */
    104: {
        message: string;
    };
    /**
     * Indicates access to uninitialized metadata
     */
    105: {
        message: string;
    };
    /**
     * Indicates that the operation would have caused `total_supply` to exceed
     * the `cap`.
     */
    106: {
        message: string;
    };
    /**
     * Indicates the supplied `cap` is not a valid cap value.
     */
    107: {
        message: string;
    };
    /**
     * Indicates the Cap was not set.
     */
    108: {
        message: string;
    };
    /**
     * Indicates the SAC address was not set.
     */
    109: {
        message: string;
    };
    /**
     * Indicates a SAC address different than expected.
     */
    110: {
        message: string;
    };
    /**
     * Indicates a missing function parameter in the SAC contract context.
     */
    111: {
        message: string;
    };
    /**
     * Indicates an invalid function parameter in the SAC contract context.
     */
    112: {
        message: string;
    };
    /**
     * The user is not allowed to perform this operation
     */
    113: {
        message: string;
    };
    /**
     * The user is blocked and cannot perform this operation
     */
    114: {
        message: string;
    };
};
/**
 * Storage keys for the data associated with the consecutive extension of
 * `NonFungibleToken`
 */
export type NFTConsecutiveStorageKey = {
    tag: "Approval";
    values: readonly [u32];
} | {
    tag: "Owner";
    values: readonly [u32];
} | {
    tag: "OwnershipBucket";
    values: readonly [u32];
} | {
    tag: "BurnedToken";
    values: readonly [u32];
};
export interface OwnerTokensKey {
    index: u32;
    owner: string;
}
/**
 * Storage keys for the data associated with the enumerable extension of
 * `NonFungibleToken`
 */
export type NFTEnumerableStorageKey = {
    tag: "TotalSupply";
    values: void;
} | {
    tag: "OwnerTokens";
    values: readonly [OwnerTokensKey];
} | {
    tag: "OwnerTokensIndex";
    values: readonly [u32];
} | {
    tag: "GlobalTokens";
    values: readonly [u32];
} | {
    tag: "GlobalTokensIndex";
    values: readonly [u32];
};
/**
 * Storage container for royalty information
 */
export interface RoyaltyInfo {
    basis_points: u32;
    receiver: string;
}
/**
 * Storage keys for royalty data
 */
export type NFTRoyaltiesStorageKey = {
    tag: "DefaultRoyalty";
    values: void;
} | {
    tag: "TokenRoyalty";
    values: readonly [u32];
};
/**
 * Storage container for the token for which an approval is granted
 * and the ledger number at which this approval expires.
 */
export interface ApprovalData {
    approved: string;
    live_until_ledger: u32;
}
/**
 * Storage container for token metadata
 */
export interface Metadata {
    base_uri: string;
    name: string;
    symbol: string;
}
/**
 * Storage keys for the data associated with `NonFungibleToken`
 */
export type NFTStorageKey = {
    tag: "Owner";
    values: readonly [u32];
} | {
    tag: "Balance";
    values: readonly [string];
} | {
    tag: "Approval";
    values: readonly [u32];
} | {
    tag: "ApprovalForAll";
    values: readonly [string, string];
} | {
    tag: "Metadata";
    values: void;
};
export type NFTSequentialStorageKey = {
    tag: "TokenIdCounter";
    values: void;
};
export declare const NonFungibleTokenError: {
    /**
     * Indicates a non-existent `token_id`.
     */
    200: {
        message: string;
    };
    /**
     * Indicates an error related to the ownership over a particular token.
     * Used in transfers.
     */
    201: {
        message: string;
    };
    /**
     * Indicates a failure with the `operator`s approval. Used in transfers.
     */
    202: {
        message: string;
    };
    /**
     * Indicates a failure with the `approver` of a token to be approved. Used
     * in approvals.
     */
    203: {
        message: string;
    };
    /**
     * Indicates an invalid value for `live_until_ledger` when setting
     * approvals.
     */
    204: {
        message: string;
    };
    /**
     * Indicates overflow when adding two values
     */
    205: {
        message: string;
    };
    /**
     * Indicates all possible `token_id`s are already in use.
     */
    206: {
        message: string;
    };
    /**
     * Indicates an invalid amount to batch mint in `consecutive` extension.
     */
    207: {
        message: string;
    };
    /**
     * Indicates the token does not exist in owner's list.
     */
    208: {
        message: string;
    };
    /**
     * Indicates the token does not exist in global list.
     */
    209: {
        message: string;
    };
    /**
     * Indicates access to unset metadata.
     */
    210: {
        message: string;
    };
    /**
     * Indicates the length of the base URI exceeds the maximum allowed.
     */
    211: {
        message: string;
    };
    /**
     * Indicates the royalty amount is higher than 10_000 (100%) basis points.
     */
    212: {
        message: string;
    };
};
export interface Client {
    /**
     * Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    mint: ({ to }: {
        to: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    balance: ({ account }: {
        account: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a owner_of transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    owner_of: ({ token_id }: {
        token_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<string>>;
    /**
     * Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    transfer: ({ from, to, token_id }: {
        from: string;
        to: string;
        token_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a transfer_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    transfer_from: ({ spender, from, to, token_id }: {
        spender: string;
        from: string;
        to: string;
        token_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a approve transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    approve: ({ approver, approved, token_id, live_until_ledger }: {
        approver: string;
        approved: string;
        token_id: u32;
        live_until_ledger: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a approve_for_all transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    approve_for_all: ({ owner, operator, live_until_ledger }: {
        owner: string;
        operator: string;
        live_until_ledger: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a get_approved transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_approved: ({ token_id }: {
        token_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Option<string>>>;
    /**
     * Construct and simulate a is_approved_for_all transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    is_approved_for_all: ({ owner, operator }: {
        owner: string;
        operator: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<boolean>>;
    /**
     * Construct and simulate a token_uri transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    token_uri: ({ token_id }: {
        token_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<string>>;
    /**
     * Construct and simulate a name transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    name: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<string>>;
    /**
     * Construct and simulate a symbol transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    symbol: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<string>>;
    /**
     * Construct and simulate a total_supply transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    total_supply: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a get_owner_token_id transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_owner_token_id: ({ owner, index }: {
        owner: string;
        index: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a get_token_id transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_token_id: ({ index }: {
        index: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a burn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    burn: ({ from, token_id }: {
        from: string;
        token_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a burn_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    burn_from: ({ spender, from, token_id }: {
        spender: string;
        from: string;
        token_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<null>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Constructor/Initialization Args for the contract's `__constructor` method */
    { owner }: {
        owner: string;
    }, 
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        mint: (json: string) => AssembledTransaction<number>;
        balance: (json: string) => AssembledTransaction<number>;
        owner_of: (json: string) => AssembledTransaction<string>;
        transfer: (json: string) => AssembledTransaction<null>;
        transfer_from: (json: string) => AssembledTransaction<null>;
        approve: (json: string) => AssembledTransaction<null>;
        approve_for_all: (json: string) => AssembledTransaction<null>;
        get_approved: (json: string) => AssembledTransaction<Option<string>>;
        is_approved_for_all: (json: string) => AssembledTransaction<boolean>;
        token_uri: (json: string) => AssembledTransaction<string>;
        name: (json: string) => AssembledTransaction<string>;
        symbol: (json: string) => AssembledTransaction<string>;
        total_supply: (json: string) => AssembledTransaction<number>;
        get_owner_token_id: (json: string) => AssembledTransaction<number>;
        get_token_id: (json: string) => AssembledTransaction<number>;
        burn: (json: string) => AssembledTransaction<null>;
        burn_from: (json: string) => AssembledTransaction<null>;
    };
}
