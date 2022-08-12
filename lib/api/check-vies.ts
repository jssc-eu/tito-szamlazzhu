// import validateVat from 'validate-vat';
import validateVat, { CountryCodes, ViesValidationResponse, ViesServerError, ViesClientError } from 'validate-vat-ts';
import dedent from 'dedent'

enum ShortCountryCodes {
  AT = CountryCodes.Austria,
  BE = CountryCodes.Belgium,
  BG = CountryCodes.Bulgaria,
  HR = CountryCodes.Croatia,
  CY = CountryCodes.Cyprus,
  CZ = CountryCodes.CzechRepublic,
  DK = CountryCodes.Denmark,
  EE = CountryCodes.Estonia,
  FI = CountryCodes.Finland,
  FR = CountryCodes.France,
  DE = CountryCodes.Germany,
  EL = CountryCodes.Greece,
  HU = CountryCodes.Hungary,
  IE = CountryCodes.Ireland,
  IT = CountryCodes.Italy,
  LV = CountryCodes.Latvia,
  LT = CountryCodes.Lithuania,
  LU = CountryCodes.Luxembourg,
  MT = CountryCodes.Malta,
  NL = CountryCodes.Netherlands,
  PL = CountryCodes.Poland,
  PT = CountryCodes.Portugal,
  RO = CountryCodes.Romania,
  SK = CountryCodes.Slovakia,
  SI = CountryCodes.Slovenia,
  ES = CountryCodes.Spain,
  SE = CountryCodes.Sweden,
  XI = CountryCodes.NorthernIreland
};

const checkVIES = async (countryCode: string, vatId: string) => {
  let vatNumber = vatId;
  const rgx = new RegExp(`^${countryCode}`, 'gi');
  if (rgx.test(vatNumber)) {
    vatNumber = vatNumber.replace(rgx, '');
  }

  vatNumber = vatNumber.replace(/[^a-zA-Z0-9.]/g, ''); // can contain only numbers and letters

  if (process.env.NODE_ENV === 'test') {
    return true
  }

  try {
    const validationInfo: ViesValidationResponse = await validateVat(ShortCountryCodes[countryCode], vatNumber);

    if (typeof validationInfo === 'undefined') {
      throw Error('No validation info received');
    }

    return validationInfo.valid;
  } catch (e) {
    console.error(dedent`
      Could not verify VAT number using the EU VIES service.
      Error details:

      ${e?.message}

      ${e?.soapResponse.match(/<H2>(.*?)<\/H2>/m)?.[0]}
    `)
    return false
  }
};

export default checkVIES;
