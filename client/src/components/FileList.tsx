import { Trash2 } from "lucide-react";
import type { FileItem } from "../types/file";
import { formatDate } from "../utils/formatDate";
import { useFilesStore } from "../store/useFilesStore";

const FileList = ({ files }: { files: FileItem[] }) => {
  const { deleteFile } = useFilesStore();
  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {files &&
          files.map((file) => (
            <li
              key={file.id}
              className="flex justify-between p-4 border rounded-xl shadow-sm bg-white border-gray-200"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {file.filename}
                </p>
                <p className="text-sm text-gray-500">
                  Uploaded on {formatDate(file.uploadedAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deleteFile(file.id)}
                className="text-red-500 cursor-pointer"
              >
                <Trash2 />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FileList;
