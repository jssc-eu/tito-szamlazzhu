import { readFile } from 'fs/promises';
import yaml from 'yaml';
import { EventConfig, InvoiceConfig, EmailConfig, TicketsConfig, BankConfig } from './index'

class SubConfig {
  event: string;
  getRawData: Function;

  constructor (key: string, getRawData: Function) {
    this.event = key;
    this.getRawData = getRawData;
  }
}

class YamlEmailConfig extends SubConfig implements EmailConfig {

  async getReplyToAddress() {
    const data = await this.getRawData()
    return data.email['reply-to-address']
  }

  async getSubject() {
    const data = await this.getRawData()
    return data.email.subject
  }

  async getMessage() {
    const data = await this.getRawData()
    return data.email.message
  }
}

class YamlInvoiceConfig extends SubConfig implements InvoiceConfig {

  bank: BankConfig;

  constructor (key: string, getRawData: Function) {
    super(key, getRawData)
    this.bank = new YamlBankConfig(key, getRawData)
  }

  async getPrefix() {
    const data = await this.getRawData()
    return data.invoice['id-prefix']
  }

  async getLogo() {
    const data = await this.getRawData()
    return data.invoice['logo-image']
  }

  async getCurrency() {
    const data = await this.getRawData()
    return data.invoice.currency
  }

  async getComment() {
    const data = await this.getRawData()
    return data.invoice.comment
  }

  async isEinvoice() {
    const data = await this.getRawData()
    return data.invoice['e-invoice']
  }

}

class YamlBankConfig extends SubConfig implements BankConfig {

  async getName() {
    const data = await this.getRawData()
    return data.bank.name
  }

  async getAccountNumber() {
    const data = await this.getRawData()
    return data.bank['account-number']
  }

}


class YamlTicketsConfig extends SubConfig implements TicketsConfig {

  async getDate(ticketName: string) {
    const data = await this.getRawData()

    let resultObj = data.dates.find(obj => ticketName.toLowerCase().includes(obj['ticket-name-contains'].toLowerCase()));

    if (typeof resultObj === 'undefined') {
      resultObj = data.dates.find(obj => obj['ticket-name-contains'] === '*');
    }
    return resultObj.date
  }

  async getNetCateringPrice(ticketName: string) {
    const data = await this.getRawData()

    let resultObj = data.catering.find(obj => ticketName.toLowerCase().includes(obj['ticket-name-contains'].toLowerCase()));

    if (typeof resultObj === 'undefined') {
      resultObj = data.catering.find(obj => obj['ticket-name-contains'] === '*');
    }
    return resultObj['net-price']
  }

}

export class YamlConfig implements EventConfig {
  protected rawData: any;
  protected configPath: string;
  protected event: string;
  invoice: InvoiceConfig;
  email: EmailConfig;
  tickets: TicketsConfig;

  constructor (key: string, configPath: string, rawData?: any) {
    this.event = key;
    this.configPath = configPath;

    if (rawData) {
      this.rawData = rawData;
    }

    this.email = new YamlEmailConfig(key, this.getRawData.bind(this))
    this.invoice = new YamlInvoiceConfig(key, this.getRawData.bind(this))
    this.tickets = new YamlTicketsConfig(key, this.getRawData.bind(this))
  }

  protected async getRawData () {
    if (this.rawData) return this.rawData;
    const file = await readFile(this.configPath, 'utf8');
    const { events }= yaml.parse(file);
    this.rawData = events[this.event]

    return this.rawData
  }

  async getLabel(): Promise<string> {
    const data = await this.getRawData()

    return data.label
  }

  async getTitoSignatureValidator(): Promise<string> {
    const data = await this.getRawData()
    const env = data['tito-signature-validator-env']
    return process.env[env]
  }
}
