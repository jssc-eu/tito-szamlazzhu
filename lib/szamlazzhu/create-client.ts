import szamlazz from '@jssc/szamlazz.js';

const createClient = (config: any, authToken: string) => new szamlazz.Client({
  authToken,
  eInvoice: config.invoice['e-invoice'],
});

export default createClient;
