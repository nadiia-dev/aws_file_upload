import { useEffect } from "react";
import FileList from "../components/FileList";
import SearchInput from "../components/SearchInput";
import Upload from "../components/Upload";
import { useUser } from "../context/userContext";
import SearchResults from "../components/SearchResults";
import type { SearchResultItem } from "../types/searchResult";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFilesStore } from "../store/useFilesStore";
import { useSearchStore } from "../store/useSearchStore";

const Home = () => {
  const { files, fetchFiles } = useFilesStore();
  const { userEmail, logoutUser } = useUser();
  const { documents, loading } = useSearchStore();
  const rawHits = documents?.body.hits.hits ?? [];

  const parsedResults: SearchResultItem[] = rawHits.map((hit) => ({
    id: hit._id,
    objectKey: hit._source.objectKey,
    docType: hit._source.docType,
    highlight: hit.highlight?.content?.[0]
      ? { content: hit.highlight.content[0] }
      : undefined,
  }));

  useEffect(() => {
    if (!userEmail) return;
    fetchFiles(userEmail);
  }, [userEmail, fetchFiles]);

  return (
    <div className="flex flex-col">
      <header className="flex justify-end items-center bg-white shadow px-4 py-3 mb-4 rounded-xl">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">{userEmail}</span>
          <button
            onClick={logoutUser}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row p-4 gap-4">
        <div className="w-full md:w-1/3 bg-blue-50 rounded-xl shadow p-4">
          <Upload />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <SearchInput />
          {rawHits.length > 0 ? (
            <SearchResults files={parsedResults} />
          ) : (
            <FileList files={files} />
          )}
          {loading && <Skeleton count={3} height={60} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
