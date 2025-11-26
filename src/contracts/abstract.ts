import * as Client from 'abstract';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Test SDF Network ; September 2015',
  contractId: 'CBEZKZKYVDNQ6QPNKAK2NHRXDPC5JYSCKARFXHAUAMHHZJU7VSROJ2Y7',
  rpcUrl,
  publicKey: undefined,
});
