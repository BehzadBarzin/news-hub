import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GET } from "../client";
import { paths } from "../types/api";

// Get the type of the query params
// The `query` object is nullable ({...} | undefined), for better type inference remove the `undefined`
type ArticleQuery = Exclude<
  paths["/api/articles"]["get"]["parameters"]["query"],
  undefined
>;

// Infer the filter query params by removing the pagination variables
export type ArticleFilter = Omit<ArticleQuery, "page" | "per_page">;

export const useArticles = (
  filter: ArticleFilter,
  page: number = 1,
  per_page: number = 15
) => {
  return useQuery({
    queryKey: ["articles", filter, page, per_page],
    queryFn: async () => {
      const { data, error } = await GET("/api/articles", {
        params: {
          query: {
            ...filter,
            page,
            per_page,
          },
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    placeholderData: (prev) => prev, // Smooth pagination experience (keepPreviousData: true, is deprecated)
  });
};

export const useInfiniteArticles = (
  filter: ArticleFilter,
  per_page: number = 15
) => {
  return useInfiniteQuery({
    queryKey: ["articles", filter],
    queryFn: async ({ pageParam }) => {
      const { data, error } = await GET("/api/articles", {
        params: {
          query: {
            ...filter,
            page: pageParam,
            per_page,
          },
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    initialPageParam: 1, // Initial value passed to queryFn (`pageParam`)
    // Get the value passed to queryFn (`pageParam`) for the next page
    getNextPageParam: (lastPage) =>
      lastPage.next_page_url ? (lastPage.current_page || 0) + 1 : undefined,
    // Get the value passed to queryFn (`pageParam`) for the previous page
    getPreviousPageParam: (firstPage) =>
      firstPage.prev_page_url ? (firstPage.current_page || 0) - 1 : undefined,
  });
};
