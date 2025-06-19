export interface SearchResultItem {
  id: string;
  filename: string;
  docType: string;
  highlight?: { content: string };
}

export interface SearchResults {
  total: number;
  results: SearchResultItem[];
}
