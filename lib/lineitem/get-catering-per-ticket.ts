import getPropByType from 'lib/lineitem/get-property-by-ticket-type';

const getCateringByTicket = (ticketName, eventConfig):number => {
  if (typeof eventConfig.catering === 'undefined') return 0;

  return getPropByType(ticketName, 'net-price', eventConfig.catering);
};

export default getCateringByTicket
