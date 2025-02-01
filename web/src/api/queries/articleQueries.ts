import { useQuery } from "@tanstack/react-query";
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
