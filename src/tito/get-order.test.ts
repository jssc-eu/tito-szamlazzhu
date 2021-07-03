import getOrder from './get-order';

const titoApi = jest.fn();

titoApi.mockResolvedValue({
  registration: {
    line_items: [],
  }
});

describe('get tito order', () => {
  test('send and receive proper api request', async () => {
    const result = await getOrder(
      {
        event: {
          account_slug: "account",
          slug: "event",
        },
        slug: "registration",
        line_items:[],
      },
      'token',
      titoApi
    );
    expect(result).toMatchObject({"line_items": []});
    expect(titoApi).toHaveBeenCalledWith('https://api.tito.io/v3/account/event/registrations/registration?view=extended', 'token');
  });
});
