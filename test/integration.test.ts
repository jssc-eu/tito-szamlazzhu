import MockDate from 'mockdate'
import createInvoice from 'lib/invoice/create'
import createClient from 'lib/szamlazzhu/create-client'

import mockOrder from './mocks/createOrder'
import mockConfig from './mocks/createConfig'
import { YamlConfig } from 'lib/eventconfig/yaml'


const token = 'ABCDEFGHIJK'

beforeEach(() => {
  MockDate.set('2020-11-22')
});

afterEach(() => {
  MockDate.reset();
});

describe('vat entries', () => {

  test('HU company', async () => {
    const order = mockOrder("hu-company", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('HU person', async () => {
    const order = mockOrder("hu-person", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company', async () => {
    const order = mockOrder("eu-company", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU person', async () => {
    const order = mockOrder("eu-person", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('Non-EU company', async () => {
    const order = mockOrder("non-eu-company", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('Non-EU person', async () => {
    const order = mockOrder("non-eu-person", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

})


describe('vat entries for online services', () => {

  test('HU company', async () => {
    const order = mockOrder("hu-company", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('HU person', async () => {
    const order = mockOrder("hu-person", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company', async () => {
    const order = mockOrder("eu-company", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);

    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU person', async () => {
    const order = mockOrder("eu-person", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('Non-EU company', async () => {
    const order = mockOrder("non-eu-company", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('Non-EU person', async () => {
    const order = mockOrder("non-eu-person", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

})

//

describe('date and catering matchers', () => {

  test('HU company with single match date', async () => {
    const order = mockOrder("hu-company", "tickets")
    const config = mockConfig("single", "single-match")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company with single match date', async () => {
    const order = mockOrder("eu-company", "tickets")
    const config = mockConfig("single", "single-match")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  //
  test('HU company with workshops', async () => {
    const order = mockOrder("hu-company", "workshops-tickets")
    const config = mockConfig("workshop", "workshop")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company with workshops', async () => {
    const order = mockOrder("eu-company", "workshops-tickets")
    const config = mockConfig("workshop", "workshop")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('HU company with workshops without catering', async () => {
    const order = mockOrder("hu-company", "workshops-tickets")
    const config = mockConfig("no-catering-workshop", "workshop")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company with workshops without catering', async () => {
    const order = mockOrder("eu-company", "workshops-tickets")
    const config = mockConfig("no-catering-workshop", "workshop")

    const invoice = await createInvoice(order, config);
    const client = await createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

})

describe('scholarship package', () => {
  test('example purchase', async () => {
    const order = {
        "_type": "registration",
        "id": 13938797,
        "test_mode": false,
        "slug": "111",
        "reference": "UD7K",
        "total": "5.0",
        "total_less_tax": "3.93700787401574804",
        "name": "Szabolcs Szabolcsi-Toth",
        "first_name": "Szabolcs",
        "last_name": "Szabolcsi-Toth",
        "email": "email@name.com",
        "phone_number": null,
        "company_name": null,
        "discount_code": null,
        "payment_reference": "111",
        "created_at": "2024-03-01T00:53:40.000+11:00",
        "completed_at": "2024-03-01T00:55:55.000+11:00",
        "completed_date": "2024-03-01",
        "metadata": null,
        "updated_at": "2024-03-01T00:55:55.000+11:00",
        "locale": "en",
        "created_date": "2024-03-01",
        "currency": "EUR",
        "custom": "",
        "paid": true,
        "line_items": [
            {
                "id": 15039035,
                "release_slug": "111",
                "release_id": 1487060,
                "release_title": "Scholarship Support package",
                "release_price": "5.0",
                "release": {
                    "slug": "111",
                    "title": "Scholarship Support package",
                    "price": "5.0",
                    "metadata": {
                        "online-service": true
                    }
                },
                "price": "5.0",
                "title": "Scholarship Support package",
                "quantity": 1,
                "total": "5.0",
                "currency": "EUR"
            }
        ],
        "quantities": {
            "qpz4bddacx4": {
                "release": "Scholarship Support package",
                "quantity": 1
            }
        },
        "tickets": [
            {
                "reference": "UD7K-1",
                "slug": "111",
                "price": "5.0",
                "price_less_tax": "3.94",
                "total_paid": "5.0",
                "total_paid_less_tax": "3.94",
                "release_id": 1487060,
                "release_slug": "qpz4bddacx4",
                "release_title": "Scholarship Support package",
                "release": {
                    "id": 1487060,
                    "slug": "qpz4bddacx4",
                    "title": "Scholarship Support package",
                    "price": "5.0",
                    "metadata": {
                        "online-service": true
                    }
                },
                "name": "Szabolcs Szabolcsi-Toth",
                "first_name": "Szabolcs",
                "last_name": "Szabolcsi-Toth",
                "company_name": null,
                "job_title": null,
                "email": "email@name.com",
                "url": "https://ti.to/tickets/111",
                "admin_url": "https://dashboard.tito.io/jsconf-bp/jsconf-budapest-2024/tickets/111",
                "opt_ins": [],
                "responses": {},
                "answers": []
            }
        ],
        "source": null,
        "payment": {
            "reference": "111",
            "type": null
        },
        "receipt": {
            "number": "0000070",
            "total": "5.0",
            "tax": "1.06",
            "total_less_tax": "3.94",
            "payment_provider": "Stripe (live)",
            "payment_reference": "111",
            "paid": true
        },
        "billing_address": {
            "address": "Address 1A",
            "city": "Cityname",
            "state_province_region": "Region",
            "zip_postal_code": "1111",
            "country": "NO",
            "country_name": "Norway",
            "vat_number": "0",
            "company_name": null
        },
        "event": {
            "_type": "event",
            "id": 1135820,
            "title": "JSConf Budapest 2024",
            "url": "https://ti.to/jsconf-bp/jsconf-budapest-2024",
            "account_slug": "jsconf-bp",
            "slug": "jsconf-budapest-2024",
            "start_date": "2024-06-27",
            "end_date": "2024-06-28",
            "metadata": null
        },
        "text": ""
    }

    const config = {
      label: 'JSConf Budapest 2021',
      catering: [
        {
          'ticket-name-contains': 'package',
          'net-price': 0,
        },
        {
          'ticket-name-contains': '*',
          'net-price': 90.3,
        },
      ],
      dates: [    {
        'ticket-name-contains': '*',
        date: 'April 8, 2020',
      },
    ],
      invoice: {
        "id-prefix": "JSSC",
        "logo-image": "JS-szamlazzhu.png",
        comment: `
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


    const conf = new YamlConfig('ads', 'asd', config)

    const invoice = await createInvoice(order, conf);
    const client = await createClient(conf, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })
})
