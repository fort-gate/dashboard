import * as Client from 'checker';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Test SDF Network ; September 2015',
  contractId: 'CDR77FU73UHXJMAVIUSEA2OI6T4R5XYA7BZTILRBKMIJOAUR3CVM7NIT',
  rpcUrl,
  publicKey: undefined,
});
