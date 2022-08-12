import countryCodes from 'lib/countrycodes';
import { RawPartner, VatRate } from 'lib/types';

const getTaxRate = (raw: RawPartner): VatRate => {
  const {
    companyName,
    countryCode,
    taxNumber,
  } = raw;

  const isEU = countryCodes(countryCode).isEuropean();
  const nonEu = !countryCodes(countryCode).isHungarian() && !countryCodes(countryCode).isEuropean();

  if (companyName && taxNumber !== '0' && (isEU || nonEu)) {
    return VatRate.TEHK;
  }

  return VatRate.Regular;
};

export default getTaxRate;
