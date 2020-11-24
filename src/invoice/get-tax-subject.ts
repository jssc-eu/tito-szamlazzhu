import szamlazz from '@jssc/szamlazz.js';

const EUCountryCodes = [
  'BE',
  'BG',
  'CZ',
  'DK',
  'DE',
  'EE',
  'IE',
  'EL',
  'GR',
  'ES',
  'FR',
  'HR',
  'IT',
  'CY',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'AT',
  'PL',
  'PT',
  'RO',
  'SI',
  'SK',
  'FI',
  'SE',
  'UK',
];

export default (order) => {
  const {
    billing_address: {
      company_name,
      country,
      vat_number,
    },
  } = order;

  if (!company_name && vat_number === '0') {
    return szamlazz.TaxSubject.NoTaxID;
  }

  if (company_name && country === 'HU') {
    return szamlazz.TaxSubject.HungarianTaxID;
  }

  if (company_name && EUCountryCodes.includes(country)) {
    return szamlazz.TaxSubject.EUCompany;
  }

  if (company_name) {
    return szamlazz.TaxSubject.NonEUCompany;
  }

  return szamlazz.TaxSubject.Unknown;
};
