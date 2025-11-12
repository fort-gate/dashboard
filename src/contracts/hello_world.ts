import * as Client from 'hello_world';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Standalone Network ; February 2017',
  contractId: 'CAYMAMOC3HGCA2STL44IJ5PAZ5R4FIX4RN2SRQ27ZTE6JX63MGKRKSZ5',
  rpcUrl,
  publicKey: undefined,
});
