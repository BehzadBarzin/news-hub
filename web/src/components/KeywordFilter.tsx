import { useEffect, useState } from "react";

interface Props {
  initialItems: string[];
  onSelect: (selected: string[]) => void;
}

const KeywordFilter = ({ initialItems, onSelect }: Props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(initialItems);

  // If selected items changes, call parent's callback
  useEffect(() => {
    onSelect(selectedItems);
  }, [selectedItems]);

  const [keyword, setKeyword] = useState("");

  const handleSelect = () => {
    if (selectedItems.includes(keyword)) return;
    setSelectedItems((prev) => [...prev, keyword]);
    setKeyword("");
  };

  const handleRemove = (keyword: string) => {
    const newSelected = selectedItems.filter((item) => item !== keyword);
    setSelectedItems(newSelected);
  };

  return (
    <div className="w-full">
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="Search Title"
          className="input input-bordered w-full flex-grow-1"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSelect}>
          +
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((item, idx) => (
          <button
            key={idx}
            className="badge badge-warning gap-2 cursor-pointer"
            onClick={() => handleRemove(item)}
          >
            {item} <span className="mx-0.5">×</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeywordFilter;
