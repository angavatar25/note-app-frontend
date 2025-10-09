import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../helper/api";

export const useGetNotes = () => {
  const query = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data } = await api.get('/notes/lists');
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
      const { data } = await api.get(`/notes/get/${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });

  return query;
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedNote) => {
      const { id } = updatedNote;

      const payload = {
        title: updatedNote.title,
        bodyText: updatedNote.bodyText,
        notecolor: updatedNote.notecolor,
        labelname: updatedNote.labelname,
      };

      const { data } = await api.put(`/notes/update/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNote) => {
      const { data } = await api.post('/notes/create', newNote);
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
      const { data } = await api.delete(`/notes/delete/${id}`);
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
      const { data } = await api.get('/notes/labels');
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};