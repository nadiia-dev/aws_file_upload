import { useEffect, useState } from "react";
import FileList from "../components/FileList";
import SearchInput from "../components/SearchInput";
import Upload from "./Upload";
import type { FileItem } from "../types/file";
import { getFiles } from "../api";
import { useUser } from "../context/userContext";
import SearchResults from "../components/SearchResults";
import useSearchDocuments from "../hooks/useSearchDocuments";
import type { SearchResultItem } from "../types/searchResult";

const Home = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [query, setQuery] = useState("");
  const userEmail = useUser();
  const { documents, loading } = useSearchDocuments(query);
  const rawHits = documents?.body.hits.hits ?? [];

  const parsedResults: SearchResultItem[] = rawHits.map((hit) => ({
    id: hit._id,
    filename: hit._source.filename,
    docType: hit._source.docType,
    highlight: hit.highlight?.content?.[0]
      ? { content: hit.highlight.content[0] }
      : undefined,
  }));

  useEffect(() => {
    if (!userEmail) return;

    const fetchData = async () => {
      try {
        const data = await getFiles(userEmail);
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <div className="w-full md:w-1/3 bg-blue-50 rounded-xl shadow p-4">
        <Upload />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <SearchInput query={query} setQuery={setQuery} />
        <FileList files={files} />
        {rawHits && <SearchResults files={parsedResults} />}
      </div>
    </div>
  );
};

export default Home;
