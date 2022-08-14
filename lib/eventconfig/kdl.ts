import { readFile } from 'fs/promises';
import { parse } from 'kdljs'
import { EventConfig, InvoiceConfig, EmailConfig, TicketsConfig, BankConfig } from './index'

const byName = (name) => (c) => c.name === name
const valueOf = (collection, name) => collection.find(byName(name))?.values[0]

class SubConfig {
  event: string;
  getRawData: Function;

  constructor (key: string, getRawData: Function) {
    this.event = key;
    this.getRawData = getRawData;
  }
}

class KdlEmailConfig extends SubConfig implements EmailConfig {

  protected async getEmailData() {
    const data = await this.getRawData()
    return data.find(byName('email'))?.children
  }

  async getReplyToAddress() {
    const data = await this.getEmailData()
    return valueOf(data, 'replyToAddress')
  }

  async getSubject() {
    const data = await this.getEmailData()
    return valueOf(data, 'subject')
  }

  async getMessage() {
    const data = await this.getEmailData()
    return valueOf(data, 'message')
  }
}

class KdlBankConfig extends SubConfig implements BankConfig {

  protected async getBankData() {
    const data = await this.getRawData()
    return data
      .find(byName('invoice'))?.children
      .find(byName('bank'))?.children
  }

  async getName() {
    const data = await this.getBankData()
    return valueOf(data, 'name')
  }

  async getAccountNumber() {
    const data = await this.getBankData()
    return valueOf(data, 'accountNumber')
  }
}

class KdlInvoiceConfig extends SubConfig implements InvoiceConfig {

  bank: BankConfig;

  constructor (key: string, getRawData: Function) {
    super(key, getRawData)
    this.bank = new KdlBankConfig(key, getRawData)
  }

  protected async getInvoiceData() {
    const data = await this.getRawData()
    return data.find(byName('invoice'))?.children
  }

  async getPrefix() {
    const data = await this.getInvoiceData()
    return valueOf(data, 'prefix')
  }

  async getLogo() {
    const data = await this.getInvoiceData()
    return valueOf(data, 'logo')
  }

  async getCurrency() {
    const data = await this.getInvoiceData()
    return valueOf(data, 'currency')
  }

  async getComment() {
    const data = await this.getInvoiceData()
    return valueOf(data, 'comment')
  }

  async isEinvoice() {
    const data = await this.getInvoiceData()
    return valueOf(data, 'e-invoice')
  }
}

class KdlTicketsConfig extends SubConfig implements TicketsConfig {

  protected async getTicketsData() {
    const data = await this.getRawData()
    return data
      .find(byName('tickets'))?.children
  }

  async getDate(name) {
    const data = await this.getTicketsData()
    let entry = data.find(c => name.toLowerCase().includes(c.name.toLowerCase()))

    if (typeof entry === 'undefined') {
      entry = data.find(byName('*'))
    }

    return valueOf(entry?.children, 'eventDate')
  }

  async getNetCateringPrice(name) {
    const data = await this.getTicketsData()

    let entry = data.find(c => name.toLowerCase().includes(c.name.toLowerCase()))

    if (typeof entry === 'undefined') {
      entry = data.find(byName('*'))
    }

    return valueOf(entry?.children, 'netCateringPrice')
  }
}


export class KdlConfig implements EventConfig {
  protected rawData: any;
  protected configPath: string;
  protected eventKey: string;
  invoice: InvoiceConfig;
  email: EmailConfig;
  tickets: TicketsConfig;

  constructor (key: string, path: string) {
    this.eventKey = key;
    this.configPath = path;

    this.email = new KdlEmailConfig(key, this.getRawData.bind(this))
    this.invoice = new KdlInvoiceConfig(key, this.getRawData.bind(this))
    this.tickets = new KdlTicketsConfig(key, this.getRawData.bind(this))
  }

  protected async getRawData () {
    if (this.rawData) return this.rawData;

    const file = await readFile(this.configPath, 'utf8');
    const config = parse(file);

    this.rawData = config.output
      .find(byName('events'))?.children
      .find(byName(this.eventKey))?.children;

    return this.rawData
  }

  async getLabel(): Promise<string> {
    const data = await this.getRawData()
    return valueOf(data, 'label')
  }

  async getTitoSignatureValidator(): Promise<string> {
    const data = await this.getRawData()
    const env = valueOf(data, 'titoSignatureValidator')
    return process.env[env]
  }
}
