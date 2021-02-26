import getTaxSubject from './get-tax-subject';
import getTaxNumber from './get-tax-number';
import getBuyerIdentifier from './get-buyer-identifier';
import { Buyer } from '../szamlazzhu/types';
import countryCodes from '../lib/countrycodes';
import checkVIES from '../lib/check-vies';
import sendMail from '../lib/send-mail';

export default async (order) : Promise<Buyer> => {
  const {
    reference,
    name,
    email,
    company_name,
    billing_address: {
      address,
      city,
      zip_postal_code: zip = '',
      country: countryCode,
      state_province_region: state = '',
    },
  } = order;

  const identifier = getBuyerIdentifier(order);
  const taxNumber = getTaxNumber(order);
  const isEU = countryCodes(countryCode).isEuropean();

  const buyerName = company_name || name;
  const addressWithState = `${address.replace(/[\r]?\n/g, ' ')} ${state}`;
  let isTEHK = false;

  if (company_name && taxNumber && isEU) {
    isTEHK = true;
    try {
      isTEHK = await checkVIES(countryCode, taxNumber);
    } catch (e) {
      sendMail(`VIES check failed for ${reference}`, `The VIES status for order ${reference} could not be validated: ${e.message}. Make sure the invoice is correct.`);

      console.warn('VIES check failed');
      console.warn(e);
    }
  }

  const data : Buyer = {
    name: buyerName,
    email,
    sendEmail: true,
    country: countryCode,
    taxNumber,
    taxSubject: getTaxSubject(order),
    zip,
    city,
    address: addressWithState,
    postAddress: {
      name: buyerName,
      zip,
      city,
      address: addressWithState,
    },
    identifier,
    phone: '',
    issuerName: name,
    isTEHK,
  };

  return data;
};
