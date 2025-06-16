import { CloudUpload } from "lucide-react";
import { useDropzone } from "react-dropzone";

const UploadInput = ({
  required,
  name,
}: {
  required: boolean;
  name: string;
}) => {
  const { getRootProps, getInputProps, isDragActive, open, acceptedFiles } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
      },
    });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl px-6 py-10 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? "bg-blue-100 border-blue-500"
            : "bg-white border-blue-300 hover:bg-blue-50"
        }`}
      >
        <input {...getInputProps({ name, required })} />
        <CloudUpload className="w-12 h-12 text-blue-400 mb-4" />
        <p className="text-blue-700 font-medium">
          Drag & drop a file here, or click to select
        </p>
        <p className="text-sm text-gray-500 mt-1">PDF or DOCX only</p>
      </div>

      <aside className="text-center">
        <button
          type="button"
          onClick={open}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
        >
          Open File Dialog
        </button>

        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-blue-700 mb-2">Selected file:</h4>
            <ul className="text-sm text-gray-700">{files}</ul>
          </div>
        )}
      </aside>
    </div>
  );
};

export default UploadInput;
