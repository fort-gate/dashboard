import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    standalone: {
        networkPassphrase: "Standalone Network ; February 2017",
        contractId: "CDR77FU73UHXJMAVIUSEA2OI6T4R5XYA7BZTILRBKMIJOAUR3CVM7NIT",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAAAAAAA=",
            "AAAAAAAAAAAAAAAIaXNfdmFsaWQAAAADAAAAAAAAAAtwcm90b2NvbF9pZAAAAAAQAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAA+0AAAACAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAAQYWRkX3RvX2JsYWNrbGlzdAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAVcmVtb3ZlX2Zyb21fYmxhY2tsaXN0AAAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAAA",
            "AAAAAAAAAAAAAAAYY3JlYXRlX21heF9hbW91bnRfcG9saWN5AAAAAgAAAAAAAAALcHJvdG9jb2xfaWQAAAAAEAAAAAAAAAAKbWF4X2Ftb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAYY3JlYXRlX21pbl9hbW91bnRfcG9saWN5AAAAAgAAAAAAAAALcHJvdG9jb2xfaWQAAAAAEAAAAAAAAAAKbWluX2Ftb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAYZW5hYmxlX21heF9hbW91bnRfcG9saWN5AAAAAQAAAAAAAAALcHJvdG9jb2xfaWQAAAAAEAAAAAA=",
            "AAAAAAAAAAAAAAAZZGlzYWJsZV9tYXhfYW1vdW50X3BvbGljeQAAAAAAAAEAAAAAAAAAC3Byb3RvY29sX2lkAAAAABAAAAAA",
            "AAAAAAAAAAAAAAAYZW5hYmxlX21pbl9hbW91bnRfcG9saWN5AAAAAQAAAAAAAAALcHJvdG9jb2xfaWQAAAAAEAAAAAA=",
            "AAAAAAAAAAAAAAAZZGlzYWJsZV9taW5fYW1vdW50X3BvbGljeQAAAAAAAAEAAAAAAAAAC3Byb3RvY29sX2lkAAAAABAAAAAA",
            "AAAAAAAAAAAAAAANZ2V0X2JsYWNrbGlzdAAAAAAAAAAAAAABAAAD6gAAABM=",
            "AAAAAAAAAAAAAAAOaXNfYmxhY2tsaXN0ZWQAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAAAE=",
            "AAAAAAAAAAAAAAAVZ2V0X21heF9hbW91bnRfcG9saWN5AAAAAAAAAQAAAAAAAAALcHJvdG9jb2xfaWQAAAAAEAAAAAEAAAPoAAAD7QAAAAIAAAALAAAAAQ==",
            "AAAAAAAAAAAAAAAVZ2V0X21pbl9hbW91bnRfcG9saWN5AAAAAAAAAQAAAAAAAAALcHJvdG9jb2xfaWQAAAAAEAAAAAEAAAPoAAAD7QAAAAIAAAALAAAAAQ=="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        is_valid: (this.txFromJSON),
        add_to_blacklist: (this.txFromJSON),
        remove_from_blacklist: (this.txFromJSON),
        create_max_amount_policy: (this.txFromJSON),
        create_min_amount_policy: (this.txFromJSON),
        enable_max_amount_policy: (this.txFromJSON),
        disable_max_amount_policy: (this.txFromJSON),
        enable_min_amount_policy: (this.txFromJSON),
        disable_min_amount_policy: (this.txFromJSON),
        get_blacklist: (this.txFromJSON),
        is_blacklisted: (this.txFromJSON),
        get_max_amount_policy: (this.txFromJSON),
        get_min_amount_policy: (this.txFromJSON)
    };
}
