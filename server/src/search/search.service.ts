import { Injectable } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { config } from 'src/config';
import { IndexDocument } from './index-document.type';

@Injectable()
export class SearchService {
  private client: Client;

  constructor() {
    this.client = new Client({
      node: config.OPENSEARCH_URL,
      auth: {
        username: config.ADMIN_USER!,
        password: config.ADMIN_PASS!,
      },
    });
  }

  async indexDocument(index: string, document: IndexDocument) {
    return this.client.index({
      index,
      body: document,
    });
  }

  async search(index: string, query: string) {
    return this.client.search({
      index,
      body: {
        query: {
          match: {
            content: query,
          },
        },
      },
    });
  }
}
