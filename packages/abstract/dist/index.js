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
        contractId: "CA4A5QMGSJ7LFQVENYBJFD7W34XTIXOGZW2PUWL2GPWGN2Z3WNE74UCU",
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
        super(new ContractSpec(["AAAAAQAAACFSZXF1ZXN0IHR5cGUgZm9yIEJsZW5kIG9wZXJhdGlvbnMAAAAAAAAAAAAAB1JlcXVlc3QAAAAAAwAAAAAAAAAHYWRkcmVzcwAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAADHJlcXVlc3RfdHlwZQAAAAQ=",
            "AAAAAQAAACBQb3NpdGlvbnMgdHlwZSByZXR1cm5lZCBieSBCbGVuZAAAAAAAAAAJUG9zaXRpb25zAAAAAAAAAwAAAAAAAAAKY29sbGF0ZXJhbAAAAAAD7AAAAAQAAAALAAAAAAAAAAtsaWFiaWxpdGllcwAAAAPsAAAABAAAAAsAAAAAAAAABnN1cHBseQAAAAAD7AAAAAQAAAAL",
            "AAAAAgAAAClSZXN1bHQgdHlwZSBmb3IgY2hlY2tfYW5kX3N1Ym1pdCBmdW5jdGlvbgAAAAAAAAAAAAALQ2hlY2tSZXN1bHQAAAAAAgAAAAEAAAAAAAAAB1N1Y2Nlc3MAAAAAAQAAB9AAAAAJUG9zaXRpb25zAAAAAAAAAQAAAAAAAAAQVmFsaWRhdGlvbkZhaWxlZAAAAAEAAAAE",
            "AAAAAAAAAMVDaGVjayBmdW5jdGlvbiB0aGF0IHZhbGlkYXRlcyB1c2VyIGFuZCBhbW91bnQsIGFuZCBpZiB2YWxpZCwgc3VibWl0cyB0byBCbGVuZApSZXR1cm5zIENoZWNrUmVzdWx0OjpTdWNjZXNzKFBvc2l0aW9ucykgaWYgc3VjY2Vzc2Z1bCwgb3IgQ2hlY2tSZXN1bHQ6OlZhbGlkYXRpb25GYWlsZWQoZXJyb3JfY29kZSkgaWYgdmFsaWRhdGlvbiBmYWlscwAAAAAAAAZzdWJtaXQAAAAAAAQAAAAAAAAABGZyb20AAAATAAAAAAAAAAdzcGVuZGVyAAAAABMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAhyZXF1ZXN0cwAAA+oAAAfQAAAAB1JlcXVlc3QAAAAAAQAAB9AAAAALQ2hlY2tSZXN1bHQA",
            "AAAAAAAAAENTaW1wbGUgY2hlY2sgZnVuY3Rpb24gdGhhdCBvbmx5IHZhbGlkYXRlcyAoYmFja3dhcmRzIGNvbXBhdGliaWxpdHkpAAAAAAVjaGVjawAAAAAAAAMAAAAAAAAAC3Byb3RvY29sX2lkAAAAABAAAAAAAAAABHVzZXIAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAABAAAD7QAAAAIAAAABAAAABA=="]), options);
        this.options = options;
    }
    fromJSON = {
        submit: (this.txFromJSON),
        check: (this.txFromJSON)
    };
}
