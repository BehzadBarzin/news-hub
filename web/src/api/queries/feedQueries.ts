import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GET, POST } from "../client";
import { paths } from "../types/api";

export const useFeeds = () => {
  return useQuery({
    queryKey: ["feeds"],
    queryFn: async () => {
      const { data, error } = await GET("/api/feeds");
      if (error) throw new Error(`API Error: ${error}`);
      return data;
    },
  });
};

export const useFeedArticles = (
  feedId: number,
  page: number = 1,
  per_page: number = 15
) => {
  return useQuery({
    queryKey: ["feedArticles", feedId, page, per_page],
    queryFn: async () => {
      const { data, error } = await GET("/api/feeds/{id}/articles", {
        params: {
          path: { id: feedId },
          query: { page, per_page },
        },
      });
      if (error) throw new Error(`API Error: ${error}`);
      return data;
    },
    placeholderData: (prev) => prev, // Smooth pagination experience (keepPreviousData: true, is deprecated)
  });
};

type NewFeed =
  paths["/api/feeds"]["post"]["requestBody"]["content"]["application/json"];

export const useCreateFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newFeed: NewFeed) => {
      const { data, error } = await POST("/api/feeds", {
        body: newFeed,
      });
      if (error) throw new Error(`API Error: ${error}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // Re-fetch feeds after creation
    },
  });
};
