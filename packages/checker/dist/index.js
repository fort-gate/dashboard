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
        contractId: "CCPPFMB3HCNL7EEESYQCJJC7U5AG6F4Y4F3UTY3QEZENN5QO3FRL2EXT",
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
        super(new ContractSpec(["AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFb3duZXIAAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAIaXNfdmFsaWQAAAADAAAAAAAAAAtwcm90b2NvbF9pZAAAAAAQAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAA+0AAAACAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAAQYWRkX3RvX2JsYWNrbGlzdAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAVcmVtb3ZlX2Zyb21fYmxhY2tsaXN0AAAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAAA",
            "AAAAAAAAAAAAAAANY3JlYXRlX3BvbGljeQAAAAAAAAIAAAAAAAAAC3Byb3RvY29sX2lkAAAAABAAAAAAAAAACm1heF9hbW91bnQAAAAAAAsAAAAA",
            "AAAAAAAAAAAAAAAJZ2V0X293bmVyAAAAAAAAAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAANZ2V0X2JsYWNrbGlzdAAAAAAAAAAAAAABAAAD6gAAABM=",
            "AAAAAAAAAAAAAAAOaXNfYmxhY2tsaXN0ZWQAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAAAE=",
            "AAAAAAAAAAAAAAAKZ2V0X3BvbGljeQAAAAAAAQAAAAAAAAALcHJvdG9jb2xfaWQAAAAAEAAAAAEAAAPoAAAACw=="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        is_valid: (this.txFromJSON),
        add_to_blacklist: (this.txFromJSON),
        remove_from_blacklist: (this.txFromJSON),
        create_policy: (this.txFromJSON),
        get_owner: (this.txFromJSON),
        get_blacklist: (this.txFromJSON),
        is_blacklisted: (this.txFromJSON),
        get_policy: (this.txFromJSON)
    };
}
