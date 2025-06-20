import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import type { FetchNotesResponse } from '../../lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const data: FetchNotesResponse = await fetchNotes(1, 12, '');

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''], 
    queryFn: () => Promise.resolve(data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={data} />
    </HydrationBoundary>
  );
}