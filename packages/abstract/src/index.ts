import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  standalone: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CBEZKZKYVDNQ6QPNKAK2NHRXDPC5JYSCKARFXHAUAMHHZJU7VSROJ2Y7",
  }
} as const


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
export type CheckResult = {tag: "Success", values: readonly [Positions]} | {tag: "ValidationFailed", values: readonly [u32]};

export interface Client {
  /**
   * Construct and simulate a submit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Check function that validates user and amount, and if valid, submits to Blend
   * Returns CheckResult::Success(Positions) if successful, or CheckResult::ValidationFailed(error_code) if validation fails
   */
  submit: ({from, spender, to, requests}: {from: string, spender: string, to: string, requests: Array<Request>}, options?: {
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
  }) => Promise<AssembledTransaction<CheckResult>>

  /**
   * Construct and simulate a check transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Simple check function that only validates (backwards compatibility)
   */
  check: ({protocol_id, user, amount}: {protocol_id: string, user: string, amount: i128}, options?: {
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
  }) => Promise<AssembledTransaction<readonly [boolean, u32]>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAACFSZXF1ZXN0IHR5cGUgZm9yIEJsZW5kIG9wZXJhdGlvbnMAAAAAAAAAAAAAB1JlcXVlc3QAAAAAAwAAAAAAAAAHYWRkcmVzcwAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAADHJlcXVlc3RfdHlwZQAAAAQ=",
        "AAAAAQAAACBQb3NpdGlvbnMgdHlwZSByZXR1cm5lZCBieSBCbGVuZAAAAAAAAAAJUG9zaXRpb25zAAAAAAAAAwAAAAAAAAAKY29sbGF0ZXJhbAAAAAAD7AAAAAQAAAALAAAAAAAAAAtsaWFiaWxpdGllcwAAAAPsAAAABAAAAAsAAAAAAAAABnN1cHBseQAAAAAD7AAAAAQAAAAL",
        "AAAAAgAAAClSZXN1bHQgdHlwZSBmb3IgY2hlY2tfYW5kX3N1Ym1pdCBmdW5jdGlvbgAAAAAAAAAAAAALQ2hlY2tSZXN1bHQAAAAAAgAAAAEAAAAAAAAAB1N1Y2Nlc3MAAAAAAQAAB9AAAAAJUG9zaXRpb25zAAAAAAAAAQAAAAAAAAAQVmFsaWRhdGlvbkZhaWxlZAAAAAEAAAAE",
        "AAAAAAAAAMVDaGVjayBmdW5jdGlvbiB0aGF0IHZhbGlkYXRlcyB1c2VyIGFuZCBhbW91bnQsIGFuZCBpZiB2YWxpZCwgc3VibWl0cyB0byBCbGVuZApSZXR1cm5zIENoZWNrUmVzdWx0OjpTdWNjZXNzKFBvc2l0aW9ucykgaWYgc3VjY2Vzc2Z1bCwgb3IgQ2hlY2tSZXN1bHQ6OlZhbGlkYXRpb25GYWlsZWQoZXJyb3JfY29kZSkgaWYgdmFsaWRhdGlvbiBmYWlscwAAAAAAAAZzdWJtaXQAAAAAAAQAAAAAAAAABGZyb20AAAATAAAAAAAAAAdzcGVuZGVyAAAAABMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAhyZXF1ZXN0cwAAA+oAAAfQAAAAB1JlcXVlc3QAAAAAAQAAB9AAAAALQ2hlY2tSZXN1bHQA",
        "AAAAAAAAAENTaW1wbGUgY2hlY2sgZnVuY3Rpb24gdGhhdCBvbmx5IHZhbGlkYXRlcyAoYmFja3dhcmRzIGNvbXBhdGliaWxpdHkpAAAAAAVjaGVjawAAAAAAAAMAAAAAAAAAC3Byb3RvY29sX2lkAAAAABAAAAAAAAAABHVzZXIAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAABAAAD7QAAAAIAAAABAAAABA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    submit: this.txFromJSON<CheckResult>,
        check: this.txFromJSON<readonly [boolean, u32]>
  }
}