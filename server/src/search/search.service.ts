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

  async getDocumentId(index: string, objectKey: string) {
    const result = await this.client.search({
      index,
      body: {
        query: {
          term: {
            'objectKey.keyword': objectKey,
          },
        },
      },
    });

    return result.body.hits.hits[0]._id;
  }

  async deleteDocument(index: string, id: string) {
    return await this.client.delete({
      index,
      id,
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
