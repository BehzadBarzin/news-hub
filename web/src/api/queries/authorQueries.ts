import { useQuery } from "@tanstack/react-query";
import { GET } from "../client";

export const useAuthors = (search?: string) => {
  return useQuery({
    queryKey: ["authors", search],
    queryFn: async () => {
      const { data, error } = await GET("/api/authors", {
        params: {
          query: search
            ? {
                name: search,
                per_page: 9999,
              }
            : {},
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
