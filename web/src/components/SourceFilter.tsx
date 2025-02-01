import { useCallback, useEffect, useState } from "react";
import { Source } from "../api/types";
import { GET } from "../api/client";
import { useSources } from "../api/queries/sourceQueries";

interface Props {
  initialItems: number[];
  onSelect: (selected: number[]) => void;
}

const SourceFilter = ({ initialItems, onSelect }: Props) => {
  const [selectedItems, setSelectedItems] = useState<Source[]>([]);

  // Initial items is an array of ids, get their entities from API on first load if selectedItems is empty
  const loadInitialItems = useCallback(async () => {
    if (selectedItems.length) return;

    // Get the Source by id
    const initialSources: Source[] = [];
    for (const id of initialItems) {
      const { data } = await GET("/api/sources/{id}", {
        params: {
          path: {
            id: id,
          },
        },
      });

      if (data) {
        initialSources.push(data);
      }
    }
    setSelectedItems(initialSources);
  }, []);

  useEffect(() => {
    loadInitialItems();
  }, []);

  // If selected items changes, call parent's callback
  useEffect(() => {
    onSelect(selectedItems.map((el) => el.id!));
  }, [selectedItems]);

  const [query, setQuery] = useState("");

  const { data: results, isLoading, isError } = useSources(query);

  const handleSelect = (item: Source) => {
    if (selectedItems.includes(item)) return;
    setSelectedItems((prev) => [...prev, item]);
    setQuery("");
  };

  const handleRemove = (id: number) => {
    const newSelected = selectedItems.filter((item) => item.id !== id);
    setSelectedItems(newSelected);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search Sources"
        className="input input-bordered w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <div className="loading loading-spinner mt-2"></div>}
      {isError && <div className="text-red-500 mt-2">Error fetching data</div>}
      <div className="mt-2 space-y-2 max-h-50 overflow-y-scroll border-2 border-base-200">
        {results?.data?.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer hover:bg-primary/50 p-2 rounded"
            onClick={() => handleSelect(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <button
            key={item.id}
            className="badge badge-accent gap-2 cursor-pointer"
            onClick={() => handleRemove(item.id!)}
          >
            {item.name} <span className="mx-0.5">×</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SourceFilter;
