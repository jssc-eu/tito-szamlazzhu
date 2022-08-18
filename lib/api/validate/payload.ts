import crypto from 'crypto';
import Boom from '@hapi/boom';
import { EventConfig } from 'lib/eventconfig';

export default async function validatePayload (request, eventConfig: EventConfig) {
  const signature = request.headers['tito-signature'];
  const validator = await eventConfig.getTitoSignatureValidator()

  const hmac = crypto
    .createHmac('sha256', validator)
    .update(request.rawBody)
    .digest('base64');


  if (signature !== hmac) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(`Tito signature STILL CANNOT BE VERIFIED "${signature}"`);
      console.error('hmac', hmac);
      console.error('raw body', request.rawBody);
    }
    throw Boom.notAcceptable();
  }
};
