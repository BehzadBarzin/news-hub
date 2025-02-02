import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE, GET, PATCH, POST } from "../client";
import { paths } from "../types/api";

export type MutationCallbacks = {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error?: Error) => void;
  onSettled?: () => void;
};

export const useFeeds = () => {
  return useQuery({
    queryKey: ["feeds"],
    queryFn: async () => {
      const { data, error } = await GET("/api/feeds");

      if (error) {
        throw error;
      }

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

      if (error) {
        throw error;
      }

      return data;
    },
    placeholderData: (prev) => prev, // Smooth pagination experience (keepPreviousData: true, is deprecated)
  });
};

type NewFeedBody =
  paths["/api/feeds"]["post"]["requestBody"]["content"]["application/json"];

export const useCreateFeed = (callbacks?: MutationCallbacks) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newFeed: NewFeedBody) => {
      callbacks?.onMutate?.();

      const { data, error } = await POST("/api/feeds", {
        body: newFeed,
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      callbacks?.onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // Re-fetch feeds after creation
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
    onSettled: () => {
      callbacks?.onSettled?.();
    },
  });
};

type UpdateFeedBody =
  paths["/api/feeds/{id}"]["patch"]["requestBody"]["content"]["application/json"];

export const useUpdateFeed = (
  feedId: number,
  callbacks?: MutationCallbacks
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (feedData: UpdateFeedBody) => {
      callbacks?.onMutate?.();

      const { data, error } = await PATCH("/api/feeds/{id}", {
        body: feedData,
        params: {
          path: { id: feedId },
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      callbacks?.onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // Re-fetch feeds after creation
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
    onSettled: () => {
      callbacks?.onSettled?.();
    },
  });
};

export const useDeleteFeed = (
  feedId: number,
  callbacks?: MutationCallbacks
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      callbacks?.onMutate?.();

      const { data, error } = await DELETE("/api/feeds/{id}", {
        params: {
          path: { id: feedId },
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      callbacks?.onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // Re-fetch feeds after creation
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
    onSettled: () => {
      callbacks?.onSettled?.();
    },
  });
};
