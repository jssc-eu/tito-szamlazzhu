import path from 'path'
import { KdlConfig } from './kdl';
import { YamlConfig } from './yaml';

export interface EventConfig {
  invoice: InvoiceConfig;
  email: EmailConfig;
  getLabel(): string;
  getTitoSignatureValidator(): string;
}

export interface InvoiceConfig {
  getPrefix(): string;
  getLogo(): string;
  getCurrency(): string;
  getComment(): string;
  isEinvoice(): boolean;
  bank: BankConfig;
}

export interface BankConfig {
  getName(): string;
  getAccountNumber(): string;
}

export interface EmailConfig {
  getReplyToAddress(): string;
  getSubject(): string;
  getMessage(): string;
}

/*

config.invoice.getPrefix()
config.invoice.getLogo()
config.invoice.getCurrency()
config.invoice.getComment()
config.invoice.isEinvoice()
config.invoice.bank.getName()
config.invoice.bank.getAccountNumber()

config.email.getReplyToAddress()
config.email.getSubject()
config.email.getMessage()

config.getTitoSignatureValidator()

*/

// export  proper parser based on coinfig filename or default filename
const createConfig = (event) => {
  const configPath = process.env.EVENT_CONFIG_PATH ?? './events-config.yaml';

  switch (path.extname(configPath)) {
    case 'kdl':
      return new KdlConfig(event, configPath);
    case 'yaml':
    case 'yml':
    default:
      return new YamlConfig(event, configPath);
  }
}

export default createConfig
