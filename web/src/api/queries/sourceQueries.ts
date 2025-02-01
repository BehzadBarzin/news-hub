import { useQuery } from "@tanstack/react-query";
import { GET } from "../client";

export const useSources = (search?: string) => {
  return useQuery({
    queryKey: ["sources", search],
    queryFn: async () => {
      const { data, error } = await GET("/api/sources", {
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
