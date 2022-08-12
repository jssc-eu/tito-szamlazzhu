import Boom from '@hapi/boom';
import auth0 from 'lib/auth0';

const auth = async function (req, res, allowed = 'GET') {
  if (req.method !== allowed) {
    throw Boom.notFound();
  }

  const session = await auth0.getSession(req, res);
  if (!session || !session.user) {
    throw Boom.notFound();
  }
}

export default auth
