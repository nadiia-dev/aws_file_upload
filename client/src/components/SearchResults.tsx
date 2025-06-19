import type { SearchResultItem } from "../types/searchResult";

const SearchResults = ({ files }: { files: SearchResultItem[] }) => {
  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {files &&
          files.map((file) => (
            <li
              key={file.id}
              className="flex justify-between p-4 border rounded-xl shadow-sm bg-white border-gray-200"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {file.filename}
                </p>
                {file.highlight && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: file.highlight?.content,
                    }}
                  ></div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchResults;
