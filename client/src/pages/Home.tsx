import { useEffect, useState } from "react";
import FileList from "../components/FileList";
import SearchInput from "../components/SearchInput";
import Upload from "./Upload";
import { toast } from "react-toastify";
import type { FileItem } from "../types/file";

const Home = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const userEmail = localStorage.getItem("userEmail");
  useEffect(() => {
    const getFiles = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/documents?email=${userEmail}`,
          {
            method: "GET",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setFiles(data);
        }
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
        }
      }
    };

    getFiles();
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
