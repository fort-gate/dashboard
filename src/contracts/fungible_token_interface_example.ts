import * as Client from 'fungible_token_interface_example';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Standalone Network ; February 2017',
  contractId: 'CBBRIGTPEQB3F7HFK2YQRD7GTH37KTJPCLBVFFJP5AALEDR3TYOCLYPZ',
  rpcUrl,
  publicKey: undefined,
});
