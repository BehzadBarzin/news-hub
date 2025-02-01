import { useQuery } from "@tanstack/react-query";
import { GET } from "../client";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await GET("/api/categories");

      if (error) {
        throw error;
      }

      /* @ts-expect-error: this data type is wrong */
      return data.data;
    },
  });
};
