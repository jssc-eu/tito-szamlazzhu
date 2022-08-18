import { EventConfig } from "lib/eventconfig";

const getSeller = async (event: EventConfig) => {

  return { // everyting is optional
    bank: {
      name: await event.invoice.bank.getName(),
      ['account-number']: await event.invoice.bank.getAccountNumber(),
    },
    email: {
      ['reply-to-address']: await event.email.getReplyToAddress(),
      subject: await event.email.getSubject(),
      message: await event.email.getMessage(),
    },
  };
};

export default getSeller;
