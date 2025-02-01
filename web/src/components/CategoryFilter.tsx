import { useState } from "react";
import { Category } from "../api/types";
import { useCategories } from "../api/queries/categoryQueries";

interface Props {
  initialItems: number[];
  onSelect: (selected: number[]) => void;
}

const CategoryFilter = ({ initialItems, onSelect }: Props) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(initialItems);

  // Fetch categories using the useCategories hook
  const { data: categories, isLoading, isError } = useCategories();

  const handleToggle = (id: number) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id) // Remove if already selected
      : [...selectedIds, id]; // Add if not selected

    setSelectedIds(newSelectedIds);
    onSelect(newSelectedIds);
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-bold">Select Categories</p>
      {categories?.map((category: Category) => (
        <button
          key={category.id}
          className={`btn ${
            selectedIds.includes(category.id!) ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => handleToggle(category.id!)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
