import { useEffect, useState } from "react";

import { searchDocuments } from "../api";
import type { OpenSearchResponse } from "../types/opentSearchResult";

const useSearchDocuments = (query: string) => {
  const [documents, setDocuments] = useState<OpenSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const res = await searchDocuments(query);
        setDocuments(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  return { documents, loading };
};

export default useSearchDocuments;
