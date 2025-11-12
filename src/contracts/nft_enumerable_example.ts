import * as Client from 'nft_enumerable_example';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Standalone Network ; February 2017',
  contractId: 'CAU3ILLIV3E4DUWVW6WNX76T5DGSYW6RUULNORCM5J3T6KZHJR6L4HT4',
  rpcUrl,
  publicKey: undefined,
});
