import yaml from 'yaml';
import szamlazz from '@jssc/szamlazz.js';
import getPartnerFromOrder from 'lib/tito/partner-from-order';
import getItemsFromOrder from 'lib/tito/items-from-order';
import getPartner from 'lib/partner';
import getSeller from 'lib/seller';
import getItems from 'lib/lineitem';
import getPaymentMethod from './get-payment-method';
import getTaxComment from 'lib/tax/comment';
import { EventConfig } from 'lib/eventconfig';

export default async function create (
  order: any,
  eventConfig: EventConfig,
  Seller: any = szamlazz.Seller,
  Buyer: any = szamlazz.Buyer,
  Item: any = szamlazz.Item,
  Invoice: any = szamlazz.Invoice
) {
  const seller = await getSeller(eventConfig);
  const rawPartner = getPartnerFromOrder(order);
  const partner = await getPartner(rawPartner);
  const rawItems = getItemsFromOrder(order);
  const items = await getItems(rawItems, partner, eventConfig);

  if (process.env.DEBUG) {
    console.warn(yaml.stringify(order));
  }

  const currency = await eventConfig.invoice.getCurrency()
  const orderNumber = order.reference;
  const invoiceIdPrefix = await eventConfig.invoice.getPrefix()
  const logoImage = await eventConfig.invoice.getLogo();
  const comment = getTaxComment(partner, items) + '\n' + await eventConfig.invoice.getComment()

  const szamlazzItems = items.map(item => new Item(item));
  return new Invoice({
    paymentMethod: getPaymentMethod(order),
    currency: szamlazz.Currency[currency],
    language: szamlazz.Language.English,
    invoiceIdPrefix,
    logoImage,
    comment,
    orderNumber,
    seller: new Seller(seller),
    buyer: new Buyer(partner),
    items: szamlazzItems,
    paid: true,
  });
};
