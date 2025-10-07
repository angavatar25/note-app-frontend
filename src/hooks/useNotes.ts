import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../helper/api";

export const useGetNotes = () => {
  const query = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data } = await api.get('/lists');
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNote) => {
      const { data } = await api.post('/create', newNote);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};