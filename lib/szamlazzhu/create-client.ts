import szamlazz from '@jssc/szamlazz.js';
import { EventConfig } from 'lib/eventconfig';
const createClient = async (eventConfig: EventConfig, authToken: string) => new szamlazz.Client({
  authToken,
  eInvoice: await eventConfig.invoice.isEinvoice(),
});

export default createClient;
