import * as Client from 'stellar_hello_world_contract';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Standalone Network ; February 2017',
  contractId: 'CBWZTZH3XXNLBHT6AG7QADVDNVJ66VEQ4Z54HIXQWT4KHZMK7L64FH4G',
  rpcUrl,
  publicKey: undefined,
});
