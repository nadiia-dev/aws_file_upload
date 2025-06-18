import type { FileItem } from "../types/file";
import { formatDate } from "../utils/formatDate";

const FileList = ({ files }: { files: FileItem[] }) => {
  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {files &&
          files.map((file) => (
            <li
              key={file.id}
              className="p-4 border rounded-xl shadow-sm bg-white border-gray-200"
            >
              <p className="text-lg font-medium text-gray-900">
                {file.filename}
              </p>
              <p className="text-sm text-gray-500">
                Uploaded on {formatDate(file.uploadedAt)}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FileList;
