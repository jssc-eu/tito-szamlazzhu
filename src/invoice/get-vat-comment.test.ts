
import { Buyer } from '../szamlazzhu/types';
import getVATComment, { NON_VAT_ACT, REVERSE_CHARGE_VAT } from './get-vat-comment';

const deepClone = <T extends unknown>(data: T): T => JSON.parse(JSON.stringify(data));

const buyerData: Buyer = {
  name: 'buyerName',
  email: 'email',
  sendEmail: true,
  country: 'HU',
  taxNumber: '',
  taxSubject: 7,
  zip: '123',
  city: 'City',
  address: 'addressWithState',
  postAddress: {
    name: 'buyerName',
    zip: '123',
    city: 'City',
    address: 'addressWithState',
  },
  identifier: "1",
  phone: '',
  issuerName: 'name',
  isTEHK: false,
};


describe('get VAT related comments', () => {
  test('hu individual / non vat subject', () => {
    const buyer = deepClone(buyerData);
    const comment = getVATComment(buyer);

    expect(comment).toBe('');
  });

  test('hu vat subject', () => {
    const buyer = deepClone(buyerData);
    buyer.taxNumber = 'HU1234567';

    const comment = getVATComment(buyer);

    expect(comment).toBe('');
  });

  test('eu individual / non vat subject', () => {
    const buyer:Buyer = deepClone(buyerData);
    buyer.taxNumber = '';
    buyer.country = 'DE';

    const comment = getVATComment(buyer);

    expect(comment).toBe(NON_VAT_ACT);
  });

  test('eu vat subject', () => {
    const buyer = deepClone(buyerData);
    buyer.taxNumber = 'DE1234567';
    buyer.country = 'DE';
    buyer.isTEHK = true;

    const comment = getVATComment(buyer);

    expect(comment).toBe(REVERSE_CHARGE_VAT);
  });

  test('non-eu individual / non vat subject', () => {
    const buyer = deepClone(buyerData);
    buyer.taxNumber = '';
    buyer.country = 'US';

    const comment = getVATComment(buyer);

    expect(comment).toBe(NON_VAT_ACT);
  });

  test('non-eu vat subject', () => {
    const buyer = deepClone(buyerData);
    buyer.taxNumber = '12323543546';
    buyer.country = 'US';

    const comment = getVATComment(buyer);

    expect(comment).toBe(NON_VAT_ACT);
  });
});
