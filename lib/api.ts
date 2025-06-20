import axios from "axios";
import type { Note } from "../types/note"


export type  FetchNotesResponse    = {
  notes: Note[];
  total: number;
  totalPages: number
};

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = ""
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim() !== "") {
    params.search = search.trim();
  }

  const res = await axios.get<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
    params,
  });

  return res.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await axios.post<Note>("/notes", note, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return res.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`, {
     headers: {
      Authorization: `Bearer ${myToken}`,
    },
  })
  return res.data
}