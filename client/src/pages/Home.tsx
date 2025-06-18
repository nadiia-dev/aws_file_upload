import { useEffect, useState } from "react";
import FileList from "../components/FileList";
import SearchInput from "../components/SearchInput";
import Upload from "./Upload";
import type { FileItem } from "../types/file";
import { getFiles } from "../api";
import { useUser } from "../context/userContext";

const Home = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const userEmail = useUser();

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
        <SearchInput />
        <FileList files={files} />
      </div>
    </div>
  );
};

export default Home;
