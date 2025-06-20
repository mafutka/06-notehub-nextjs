import NoteDetailsClient from './NoteDetails.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api'; 


type Params = {
  params: {
    id: string;
  };
};

export default async function NoteDetailsPage({ params }: Params) {
  const noteId = params.id; 
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById((noteId)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient  />
    </HydrationBoundary>
  );
}