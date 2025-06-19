import { Search } from "lucide-react";

const SearchInput = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    const value = input.value;
    setQuery(value);
  };

  return (
    <form className="w-full" onSubmit={(e) => handleSearch(e)}>
      <label className="w-full flex items-center border rounded-xl border-gray-300 dark:border-gray-600 focus-within:ring-2 ring-blue-500 overflow-hidden shadow-sm">
        <input
          type="text"
          name="search"
          placeholder="Search for files..."
          defaultValue={query}
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
