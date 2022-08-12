import { readFile } from 'fs/promises';
import { parse } from 'kdljs'
import { EventConfig, InvoiceConfig, EmailConfig } from './index'

export class KdlConfig implements EventConfig {
  protected rawData: Object;
  protected configPath: string;
  protected eventKey: string;
  protected invoice: InvoiceConfig;
  protected email: EmailConfig;

  constructor (key: string, path: string) {
    this.eventKey = key;
    this.configPath = path;

  }

  protected async getRawData () {
    if (this.rawData) return this.rawData;

    const file = await readFile(this.configPath, 'utf8');
    const config = parse(file);
    this.rawData = config.output;

    return this.rawData
  }
}
