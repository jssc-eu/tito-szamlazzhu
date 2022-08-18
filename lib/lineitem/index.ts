import { roundTo } from 'round-to';
import { Partner, RawItem, Item, VatRate } from 'lib/types';
import { EventConfig } from 'lib/eventconfig';

const getVatRateField = (buyer, isOnlineService) => {
  if (isOnlineService && buyer.isTEHK) {
    return VatRate.TEHK;
  }

  return VatRate.Regular;
};


const getLineItems = async (rawItems: RawItem[], buyer: Partner, eventConfig: EventConfig) => {
  const result = []

  for (let ticket of rawItems) {
    const {
      price,
      quantity,
      title,
      isOnlineService,
      discount = 0,
    } = ticket;

    if (price === 0) {
      continue;
    }

    const vatRate = getVatRateField(buyer, isOnlineService);
    const date = await eventConfig.tickets.getDate(title);
    const cateringPartial = await eventConfig.tickets.getNetCateringPrice(title);
    const ticketPartial = roundTo(price - (cateringPartial * 1.27), 2);

    const discountComment = (discount != 0) ? ` ${discount}% discount included.` : ``;

    const item: Item = {
      label: title,
      quantity,
      unit: 'qt',
      vat: vatRate,
      comment: `Ticket for ${await eventConfig.getLabel()}, ${date}.${discountComment}`,
    };

    if (vatRate === VatRate.TEHK) {
      item.netUnitPrice = ticketPartial;
      item.grossValue = item.netValue = (ticketPartial * quantity);
    } else {
      item.grossUnitPrice = ticketPartial; // calculates gross and net values from per item net
    }

		result.push(item);

    if (cateringPartial !== 0) {
      const cateringItem: Item = {
        label: 'Mediated services',
        comment: 'Conference catering fee',
        quantity,
        unit: 'qt',
        vat: vatRate,
      };

      if (vatRate === VatRate.TEHK) {
        cateringItem.netUnitPrice = roundTo(cateringPartial * 1.27, 2);
        cateringItem.grossValue = cateringItem.netValue = (roundTo(cateringPartial * 1.27, 2) * quantity);
      } else {
        cateringItem.grossUnitPrice = roundTo(cateringPartial * 1.27, 2); // calculates gross and net values from per item net
      }

      result.push(cateringItem);
    }
  }

  return result;
}



export default getLineItems;
