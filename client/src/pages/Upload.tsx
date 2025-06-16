import { useState } from "react";
import UploadInput from "../components/UploadInput";
import { toast } from "react-toastify";

const Upload = () => {
  const [presignedUrl, setPresignedUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("my-file");
    try {
      const res = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });
      if (res.ok) {
        await fetch("http://localhost:3000/documents/upload", {
          method: "POST",
          body: JSON.stringify({
            userEmail: localStorage.getItem("userEmail"),
            filename: file?.name,
            s3Url: fileUrl,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
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
