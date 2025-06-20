import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import type { Note } from '../../types/note';
import Link from 'next/link';

import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  if (!notes.length) return null;

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <Link className={css['no-underline']} href={`/notes/${id}`}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
            </Link>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span> 
            <button className={css.button} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        
        </li>
      ))}
    </ul>
  );
}



