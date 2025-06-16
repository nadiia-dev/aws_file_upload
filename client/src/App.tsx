import UploadInput from "./components/UploadInput";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        className="max-w-md w-full flex flex-col space-y-6 justify-center"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const file = formData.get("my-file");
          console.log(file);
        }}
      >
        <UploadInput name="my-file" required />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition self-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
