import * as Client from 'checker';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Test SDF Network ; September 2015',
  contractId: 'CBWCZP23O2R5HCSRNZQLMW3LBLJFFFAVEXPAFNZ2C3V3FWUVV3KCPDFH',
  rpcUrl,
  publicKey: undefined,
});
