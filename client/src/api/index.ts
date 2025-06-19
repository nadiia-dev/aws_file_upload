import { toast } from "react-toastify";

export const uploadFile = async (
  presignedUrl: string,
  userEmail: string,
  file: File,
  fileUrl: string,
  key: string
) => {
  try {
    const res = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
    });
    if (res.ok) {
      await fetch(`${import.meta.env.VITE_API_URL}/documents/upload`, {
        method: "POST",
        body: JSON.stringify({
          userEmail,
          filename: file?.name,
          s3Url: fileUrl,
          objectKey: key,
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

export const generatePresignedUrl = async (name: string, type: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/documents/generate-presigned-url`,
      {
        method: "POST",
        body: JSON.stringify({ fileName: name, fileType: type }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      toast.error(e.message);
    }
  }
};

export const getFiles = async (userEmail: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/documents?email=${userEmail}`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    if (e instanceof Error) {
      toast.error(e.message);
    }
  }
};

export const deleteDocument = async (id: number) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/documents/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.success("Your document was deleted!");
    }
  } catch (e) {
    if (e instanceof Error) {
      toast.error(e.message);
    }
  }
};

export const searchDocuments = async (query: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/documents/search?searchQuery=${query}`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    if (e instanceof Error) {
      toast.error(e.message);
    }
  }
};
