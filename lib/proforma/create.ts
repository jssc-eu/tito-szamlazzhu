import szamlazz from '@jssc/szamlazz.js';
import getPartner from 'lib/partner';
import getSeller from 'lib/seller';
import getItems from 'lib/lineitem';
import invoiceComment from 'lib/invoice/comment';
import { EventConfig } from 'lib/eventconfig';

export default async function create (
  order: any,
  config: EventConfig,
  Seller: any = szamlazz.Seller,
  Buyer: any = szamlazz.Buyer,
  Item: any = szamlazz.Item,
  Invoice: any = szamlazz.Invoice
) {
  const seller = await getSeller(config);

  const partner = await getPartner(order.partner);
  const items = await getItems(order.lineItems, partner, config);

  const currency = await config.invoice.getCurrency()
  const orderNumber = (Math.random() * 1000).toString(32).replace('.', '').toUpperCase();
  const invoiceIdPrefix = await config.invoice.getPrefix()
  const logoImage = await config.invoice.getLogo()
  const comment = invoiceComment(order.comment ?? '', partner, items);

  const szamlazzItems = items.map(item => new Item(item));

  const { dueDays = 8 } = order.partner
  const dueDate = new Date(+new Date() + 1000 * 60 * 60 * 24 * dueDays);
  return new Invoice({
    paymentMethod: szamlazz.PaymentMethod.BankTransfer,
    currency: szamlazz.Currency[currency],
    language: szamlazz.Language.English,
    invoiceIdPrefix,
    logoImage,
    comment,
    dueDate,
    fulfillmentDate: dueDate,
    orderNumber,
    seller: new Seller(seller),
    buyer: new Buyer(partner),
    items: szamlazzItems,
    proforma: true,
    paid: false,
  });
}
