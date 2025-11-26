import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from '@stellar/stellar-sdk/contract';
import type { u32, i128 } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly standalone: {
        readonly networkPassphrase: "Standalone Network ; February 2017";
        readonly contractId: "CBEZKZKYVDNQ6QPNKAK2NHRXDPC5JYSCKARFXHAUAMHHZJU7VSROJ2Y7";
    };
};
/**
 * Request type for Blend operations
 */
export interface Request {
    address: string;
    amount: i128;
    request_type: u32;
}
/**
 * Positions type returned by Blend
 */
export interface Positions {
    collateral: Map<u32, i128>;
    liabilities: Map<u32, i128>;
    supply: Map<u32, i128>;
}
/**
 * Result type for check_and_submit function
 */
export type CheckResult = {
    tag: "Success";
    values: readonly [Positions];
} | {
    tag: "ValidationFailed";
    values: readonly [u32];
};
export interface Client {
    /**
     * Construct and simulate a submit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Check function that validates user and amount, and if valid, submits to Blend
     * Returns CheckResult::Success(Positions) if successful, or CheckResult::ValidationFailed(error_code) if validation fails
     */
    submit: ({ from, spender, to, requests }: {
        from: string;
        spender: string;
        to: string;
        requests: Array<Request>;
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
    }) => Promise<AssembledTransaction<CheckResult>>;
    /**
     * Construct and simulate a check transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Simple check function that only validates (backwards compatibility)
     */
    check: ({ protocol_id, user, amount }: {
        protocol_id: string;
        user: string;
        amount: i128;
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
    }) => Promise<AssembledTransaction<readonly [boolean, u32]>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
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
        submit: (json: string) => AssembledTransaction<CheckResult>;
        check: (json: string) => AssembledTransaction<readonly [boolean, number]>;
    };
}
