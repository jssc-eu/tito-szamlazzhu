import path from 'path'
import { KdlConfig } from './kdl';
import { YamlConfig } from './yaml';

export interface EventConfig {
  tickets: TicketsConfig;
  invoice: InvoiceConfig;
  email: EmailConfig;
  getLabel(): Promise<string>;
  getTitoSignatureValidator(): Promise<string>;
}

export interface InvoiceConfig {
  getPrefix(): Promise<string>;
  getLogo(): Promise<string>;
  getCurrency(): Promise<string>;
  getComment(): Promise<string>;
  isEinvoice(): Promise<boolean>;
  bank: BankConfig;
}

export interface BankConfig {
  getName(): Promise<string>;
  getAccountNumber(): Promise<string>;
}

export interface EmailConfig {
  getReplyToAddress(): Promise<string>;
  getSubject(): Promise<string>;
  getMessage(): Promise<string>;
}

export interface TicketsConfig {
  getDate(ticketName: string): Promise<string>;
  getNetCateringPrice(ticketName: string): Promise<number>;
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
