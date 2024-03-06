import { RawPartner } from 'lib/types';

const getIdentifier = (raw: Partial<RawPartner>): string => {
  const {
    email,
    companyName,
    taxNumber,
  } = raw;

  if (typeof taxNumber !== 'undefined' && taxNumber && taxNumber !== '0' && taxNumber !== '') {
    return taxNumber.replace(/[-_\s]/g, '').toUpperCase();
  } else if (typeof companyName !== 'undefined' && companyName && companyName !== '') {
    return companyName.replace(/[\s.]/g, '_').replace(/_+/g, '_').toUpperCase();
  }

  return email.replace(/[\s.@]/g, '_').replace(/_+/g, '_').toUpperCase();
};

export default getIdentifier
