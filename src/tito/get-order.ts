import { release } from 'os';
import api from '../api';


export const attachMetaData = (registration, orderData) => {

  const data = Object.assign({}, orderData);

  data.line_items = data.line_items.map(item => {
    const lineitem = registration.line_items.find(i => i.release_id === item.release_id)
    item.release = lineitem.release
    return item
  })

  return data
}

export default async (
  registrationData,
  token,
  titoApi = api,
) => {
  const {
    event: {
      account_slug: account,
      slug: event,
    },
    slug: registration,
  } = registrationData;

  const url = `https://api.tito.io/v3/${account}/${event}/registrations/${registration}?view=extended`;

  const { registration: order } = await titoApi(url, token);

  return attachMetaData(registrationData, order);
};
