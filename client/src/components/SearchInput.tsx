import { Search } from "lucide-react";
import { useSearchStore } from "../store/useSearchStore";
import { useUser } from "../context/userContext";

const SearchInput = () => {
  const { query, setDocuments, search } = useSearchStore();
  const userEmail = useUser();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    const value = input.value;
    if (value.trim() === "") {
      setDocuments(null);
    } else {
      search(userEmail!, value);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setDocuments(null);
    }
  };

  return (
    <form className="w-full" onSubmit={(e) => handleSearch(e)}>
      <label className="w-full flex items-center border rounded-xl border-gray-300 dark:border-gray-600 focus-within:ring-2 ring-blue-500 overflow-hidden shadow-sm">
        <input
          type="text"
          name="search"
          placeholder="Search for files..."
          defaultValue={query}
          onChange={(e) => handleChange(e)}
          className="flex-1 px-4 py-2 outline-none bg-transparent text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        >
          <Search className="text-gray-600" />
        </button>
      </label>
    </form>
  );
};

export default SearchInput;
