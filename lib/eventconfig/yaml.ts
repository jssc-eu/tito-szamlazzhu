import { readFile } from 'fs/promises';
import yaml from 'yaml';
import { EventConfig, InvoiceConfig, EmailConfig } from './index'

export class YamlConfig implements EventConfig {
  protected rawData: Object;
  protected configPath: string;
  protected eventKey: string;
  protected invoice: InvoiceConfig;
  protected email: EmailConfig;

  constructor (key: string, configPath: string) {
    this.eventKey = key;
    this.configPath = configPath;

  }

  protected async getRawData () {
    if (this.rawData) return this.rawData;

    const file = await readFile(this.configPath, 'utf8');

    this.rawData = yaml.parse(file);

    return this.rawData

  }


}
