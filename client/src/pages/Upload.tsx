import { useState } from "react";
import UploadInput from "../components/UploadInput";

const Upload = () => {
  const [presignedUrl, setPresignedUrl] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("my-file");
    console.log(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        className="max-w-md w-full flex flex-col space-y-6 justify-center"
        onSubmit={handleSubmit}
      >
        <UploadInput
          name="my-file"
          required
          setPresignedUrl={setPresignedUrl}
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
