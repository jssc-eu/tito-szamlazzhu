import errorHandler from 'lib/api/error-handler';
import debugXML from 'lib/api/debug-xml';

const sendInvoice = async (invoice, client) => new Promise((resolve, reject) => {
    client.issueInvoice(invoice, (err, result) => {
      if (err) {
        errorHandler('INVOICE ERROR', debugXML(invoice));
        return reject(err);
      }
      resolve(result.invoiceId);
    });
  });

export default sendInvoice;
