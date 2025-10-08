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

export const useGetNotesById = (id: string) => {
  const query = useQuery({
    queryKey: ['notes', id],
    queryFn: async () => {
      const { data } = await api.get(`/get/${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!id,
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

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/delete/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useGetLabels = () => {
  const query = useQuery({
    queryKey: ['labels'],
    queryFn: async () => {
      const { data } = await api.get('/labels');
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};