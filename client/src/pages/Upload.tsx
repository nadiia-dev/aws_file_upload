import { useState } from "react";
import UploadInput from "../components/UploadInput";
import { toast } from "react-toastify";

const Upload = () => {
  const [presignedUrl, setPresignedUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("my-file") as File;
    try {
      const res = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });
      if (res.ok) {
        await fetch(`${import.meta.env.VITE_API_URL}/documents/upload`, {
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
        toast.success("File was uploaded successfully!");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
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
