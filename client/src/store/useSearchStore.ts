import { create } from "zustand";
import { searchDocuments } from "../api";
import type { OpenSearchResponse } from "../types/opentSearchResult";

interface SearchState {
  query: string;
  documents: OpenSearchResponse | null;
  setDocuments: (doc: OpenSearchResponse | null) => void;
  loading: boolean;
  setQuery: (q: string) => void;
  search: (q?: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  documents: null,
  loading: false,

  setDocuments: (doc) => {
    set({ documents: doc });
  },

  setQuery: (q) => set({ query: q }),

  search: async (q) => {
    if (!q) {
      set({ documents: null });
      return;
    }

    set({ loading: true });
    try {
      const res = await searchDocuments(q);
      set({ documents: res });
    } catch (e) {
      console.error(e);
      set({ documents: null });
    } finally {
      set({ loading: false });
    }
  },
}));
