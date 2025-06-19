interface OpenSearchHit {
  _id: string;
  _source: {
    filename: string;
    docType: string;
  };
  highlight?: {
    content?: string[];
  };
}

export interface OpenSearchResponse {
  body: {
    hits: {
      total: {
        value: number;
        relation: string;
      };
      hits: OpenSearchHit[];
    };
  };
}
