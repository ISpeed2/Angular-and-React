import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../api/posts';

const listQueries = {
  predicate: (query) => query.queryKey[0] === 'posts' && typeof query.queryKey[1] === 'object' && query.queryKey[1] !== null,
};

export function usePosts({ page = 1, search = '' } = {}) {
  return useQuery({
    queryKey: ['posts', { page, search }],
    queryFn: ({ signal }) => getPosts({ page, search }, signal),
    placeholderData: (previous) => previous,
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: ['posts', String(id)],
    queryFn: ({ signal }) => getPost(id, signal),
    enabled: Boolean(id), retry: false,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onMutate: async (data) => {
      await queryClient.cancelQueries(listQueries);
      const previous = queryClient.getQueriesData(listQueries);
      const optimistic = { ...data, id: 'temp-' + Date.now() };
      previous.forEach(([key, old]) => {
        if (!old) return;
        const filters = key[1];
        const matchesSearch = !filters.search || optimistic.title.toLowerCase().includes(filters.search.toLowerCase());
        if (filters.page === 1 && matchesSearch) {
          queryClient.setQueryData(key, { ...old, items: [optimistic, ...old.items], total: old.total + 1 });
        } else if (matchesSearch) {
          queryClient.setQueryData(key, { ...old, total: old.total + 1 });
        }
      });
      return { previous };
    },
    onError: (_error, _data, context) => context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data)),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (post, variables) => queryClient.setQueryData(['posts', String(variables.id)], post),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previous = queryClient.getQueriesData(listQueries);
      queryClient.setQueriesData(listQueries, (old) => old ? {
        ...old,
        items: old.items.filter((post) => String(post.id) !== String(id)),
        total: Math.max(0, old.total - (old.items.some((post) => String(post.id) === String(id)) ? 1 : 0)),
      } : old);
      return { previous };
    },
    onError: (_error, _id, context) => context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data)),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
}
