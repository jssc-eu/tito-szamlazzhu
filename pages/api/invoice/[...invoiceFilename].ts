import authApi from 'lib/api/auth';
import  { Readable }  from 'stream'
import { promisify } from 'util'
import getEventConfig from 'lib/eventconfig'
import createClient from 'lib/szamlazzhu/create-client';

export default async function callback(req, res) {
  try {
    await authApi(req, res, 'GET');

    const {
      invoiceFilename,
      eventId
    } = req.query

    const eventConfig = getEventConfig(eventId);

    const invoiceId = invoiceFilename[0].replace('.pdf','')
    const client = await createClient(eventConfig, process.env.SZAMLAZZ_TOKEN)
    const getInvoiceData = promisify(client.getInvoiceData).bind(client)
    const invoice = await getInvoiceData({
      invoiceId,
      pdf: true
    })

    if (invoice && invoice.pdf) {
      const readable = new Readable();
      readable._read = () => {} // _read is required but you can noop it
      readable.push(Buffer.from(invoice.pdf[0], 'base64'))
      readable.push(null)
      readable.pipe(res)
      res
        .status(200)
        .setHeader('Content-Type', 'application/pdf')
      return
    }

    res.status(404).end();
  } catch (e) {
    console.error(e);
    const err = e?.output?.payload || e.toString();
    res.status(err?.statusCode || 500).end(err?.error || 'Internal error occured');
  }
}
