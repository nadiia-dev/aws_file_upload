export interface SearchResultItem {
  id: string;
  objectKey: string;
  docType: string;
  highlight?: { content: string };
}

export interface SearchResults {
  total: number;
  results: SearchResultItem[];
}
