import { useState } from "react";
import { ArticleFilter, useArticles } from "../api/queries/articleQueries";
import { Article } from "../api/types";
import ArticleCard from "../components/ArticleCard";
import AuthorFilter from "../components/AuthorFilter";
import CategoryFilter from "../components/CategoryFilter";
import DateFilter from "../components/DateFilter";
import KeywordFilter from "../components/KeywordFilter";
import SourceFilter from "../components/SourceFilter";
import { useSearchParams } from "react-router-dom";

const Headlines = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract filters from URL
  const title = searchParams.get("title")?.split(",") || [];
  const authors = searchParams.get("authors")?.split(",").map(Number) || [];
  const sources = searchParams.get("sources")?.split(",").map(Number) || [];
  const categories =
    searchParams.get("categories")?.split(",").map(Number) || [];
  const publishedAfter = searchParams.get("published_after") || "";
  const publishedBefore = searchParams.get("published_before") || "";

  // Fetch articles based on filters
  const { data: articleData, isLoading } = useArticles({
    title: title.join(","),
    authors: authors.join(","),
    source: sources.join(","),
    category: categories.join(","),
    published_after: publishedAfter,
    published_before: publishedBefore,
    with: "authors,category,source",
  });

  // Handle filter changes
  const updateFilters = (newFilters: ArticleFilter) => {
    const currentParams = Object.fromEntries(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      const trimmedValue = value.trim();

      // Remove the key if the value is empty or equals ","
      if (!trimmedValue || trimmedValue === ",") {
        delete currentParams[key];
      } else {
        currentParams[key] = trimmedValue;
      }
    });

    setSearchParams(currentParams);
  };

  return (
    <div className="drawer lg:drawer-open flex flex-col lg:flex-row min-h-screen mt-[-10px] h-full">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Sidebar */}
      <div className={`drawer-side z-50 overflow-scroll bg-base-200 px-4 pt-3`}>
        <div className="flex flex-col w-full">
          <label
            htmlFor="my-drawer"
            className="drawer-button btn btn-sm lg:hidden mb-4 w-full btn-secondary btn-dash"
          >
            Close Filters
          </label>

          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <div className="space-y-4">
            {/* Title Filter */}
            <KeywordFilter
              initialItems={title}
              onSelect={(selected: string[]) =>
                updateFilters({ title: selected.join(",") })
              }
            />

            {/* Authors Filter */}
            <AuthorFilter
              initialItems={authors}
              onSelect={(selected: number[]) =>
                updateFilters({ authors: selected.join(",") })
              }
            />

            {/* Sources Filter */}
            <SourceFilter
              initialItems={sources}
              onSelect={(selected: number[]) =>
                updateFilters({ source: selected.join(",") })
              }
            />

            {/* Categories Filter */}
            <CategoryFilter
              initialItems={categories}
              onSelect={(selected: number[]) =>
                updateFilters({ category: selected.join(",") })
              }
            />

            {/* Date Filters */}
            <DateFilter
              label="Published After"
              initial={publishedAfter ? new Date(publishedAfter) : null}
              onSelect={(selected: Date | null) =>
                updateFilters({
                  published_after: selected?.toISOString().split("T")[0] || "",
                })
              }
            />
            <DateFilter
              label="Published Before"
              initial={publishedBefore ? new Date(publishedBefore) : null}
              onSelect={(selected: Date | null) =>
                updateFilters({
                  published_before: selected?.toISOString().split("T")[0] || "",
                })
              }
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className={`drawer-content flex-1 p-4`}>
        <label
          htmlFor="my-drawer"
          className="drawer-button btn btn-sm lg:hidden mb-4 w-full btn-primary"
        >
          Open Filters
        </label>

        {/* Article Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="skeleton h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articleData?.data?.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Headlines;
