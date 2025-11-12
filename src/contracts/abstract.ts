import * as Client from 'abstract';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Test SDF Network ; September 2015',
  contractId: 'CBPXVCDXVCRCD7RHXYPQUHKVE7OGLU6VSUHWIXYFBRRAS2VEZKZ2VA7L',
  rpcUrl,
  publicKey: undefined,
});
