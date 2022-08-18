import { YamlConfig } from 'lib/eventconfig/yaml';
import validateTitoPayload from './payload';
import crypto from 'crypto';

process.env.TITO_TOKEN_RF = 'abcd1234';

const payloadEvent = { foo: 'bar', event: { slug: 'reinforce2020' } };

describe('tito payload validation', () => {
  let config

  beforeAll(() => {
    config = new YamlConfig('event', 'path', {
      'tito-signature-validator-env': 'TITO_TOKEN_RF',
    })
  })

  test('validate event payload with hash mismatch', () => {
    expect(() => {
      return validateTitoPayload({
        headers: { 'tito-signature': 'foo' },
        body: payloadEvent,
        rawBody: JSON.stringify(payloadEvent),
      },
      config);
    }).rejects.toThrow('Not Acceptable');
  });

  test('validate event payload with proper hash', () => {
    const hmac = crypto
      .createHmac('sha256', process.env.TITO_TOKEN_RF)
      .update(JSON.stringify(payloadEvent))
      .digest('base64');

    expect(async () => {
      await validateTitoPayload({
        headers: { 'tito-signature': hmac },
        body: payloadEvent,
        rawBody: JSON.stringify(payloadEvent),
      },
      config);
    }).not.toThrow('Not Acceptable');
  });
});
