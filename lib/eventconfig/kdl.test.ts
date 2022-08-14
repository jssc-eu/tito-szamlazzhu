import { KdlConfig } from './kdl'

describe('parse yaml config', () => {

  let config

  beforeAll(() => {
    config = new KdlConfig('integration-test-event-2022', './test-config.kdl')
  })

  test('getLabel', async () => {
    const value = await config.getLabel()
    expect(value).toBe('JSConf Budapest 2022')
  });

  test('getTitoSignatureValidator', async () => {
    const value = await config.getTitoSignatureValidator()
    expect(value).toBe('titotokentest1234')
  });

  describe('email', () => {

    test('getReplyToAddress', async () => {
      const value = await config.email.getReplyToAddress()
      expect(value).toBe('nec@jsconfbp.com')
    });

    test('getSubject', async () => {
      const value = await config.email.getSubject()
      expect(value).toBe('Your invoice for Integration Test Event 2020')
    });

    test('getMessage', async () => {
      const value = await config.email.getMessage()
      expect(value).toContain('Dear Attendee!')
    });

  })

  describe('invoice', () => {

    test('getPrefix', async () => {
      const value = await config.invoice.getPrefix()
      expect(value).toBe('WIPAO')
    })

    test('getLogo', async () => {
      const value = await config.invoice.getLogo()
      expect(value).toBe('JSCBP-szamlazzhu.png')
    })

    test('getCurrency', async () => {
      const value = await config.invoice.getCurrency()
      expect(value).toBe('EUR')
    })

    test('getComment', async () => {
      const value = await config.invoice.getComment()
      expect(value).toContain('Paid in full.')
    })

    test('isEinvoice', async () => {
      const value = await config.invoice.isEinvoice()
      expect(value).toBe(false)
    })

    describe('bank', () => {

      test('getName', async () => {
        const value = await config.invoice.bank.getName()
        expect(value).toBe('Raiffeisen Bank, SWIFT: UBRTHUHB')
      })

      test('getAccountNumber', async () => {
        const value = await config.invoice.bank.getAccountNumber()
        expect(value).toBe('HU18-1201-0659-0160-2199-0020-0008')
      })
    })
  })

  describe('tickets', () => {

    test('getDate', async () => {
      const value1 = await config.tickets.getDate('Regular')
      expect(value1).toBe('September 24-25, 2020')

      const value2 = await config.tickets.getDate('Some workshop')
      expect(value2).toBe('September 23, 2020')
    })

    test('getNetCateringPrice', async () => {
      const value1 = await config.tickets.getNetCateringPrice('Regular ticket')
      expect(value1).toBe(40)

      const value2 = await config.tickets.getNetCateringPrice('Some workshop')
      expect(value2).toBe(20)

      const value3 = await config.tickets.getNetCateringPrice('Online admission')
      expect(value3).toBe(0)
    })

  })

})
