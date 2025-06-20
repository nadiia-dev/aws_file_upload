import { create } from "zustand";
import { deleteDocument, getFiles } from "../api";
import type { FileItem } from "../types/file";

interface FilesStore {
  files: FileItem[];
  loading: boolean;
  fetchFiles: (email: string) => Promise<void>;
  addFile: (file: FileItem) => void;
  deleteFile: (id: number) => void;
}

export const useFilesStore = create<FilesStore>((set, get) => ({
  files: [],
  loading: false,
  fetchFiles: async (email: string) => {
    set({ loading: true });
    const data = await getFiles(email);
    set({ files: data, loading: false });
  },
  deleteFile: async (id: number) => {
    await deleteDocument(id);
    set({ files: get().files.filter((file) => file.id !== id) });
  },
  addFile: (file) => {
    set((state) => ({ files: [...state.files, file] }));
  },
}));
