const dedent = require('dedent')

module.exports = {
  label: 'JSConf Budapest 2021',
  catering: [
    {
      'ticket-name-contains': '*',
      'net-price': 90.3,
    },
  ],
  invoice: {
    "id-prefix": "JSSC",
    "logo-image": "JS-szamlazzhu.png",
    comment: dedent`
        The invoice includes mediated services.
        Paid in full.
        This document was issued electronically and is therefore valid without signature.`,
    "e-invoice": true,
    currency: "EUR",
  },
  bank: {
    name: 'Raiffeisen Bank, SWIFT: UBRTHUHB',
    "account-number": 'HU73-1201-0659-0160-2199-0040-0002'
  },
  email: {
    "reply-to-address": "nec@jsconfbp.com",
    subject: "Your invoice for Integration Test Event 2020",
    message: "Email message",
  }
};
