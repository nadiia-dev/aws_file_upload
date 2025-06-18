import { useState } from "react";
import UploadInput from "../components/UploadInput";
import { useUser } from "../context/userContext";
import { uploadFile } from "../api";

const Upload = () => {
  const [presignedUrl, setPresignedUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const userEmail = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("my-file") as File;
    await uploadFile(presignedUrl, userEmail!, file, fileUrl);
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center">
      <form
        className="w-full flex flex-col space-y-6 justify-center"
        onSubmit={handleSubmit}
      >
        <UploadInput
          name="my-file"
          required
          setPresignedUrl={setPresignedUrl}
          setFileUrl={setFileUrl}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition self-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;
