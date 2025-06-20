'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../lib/api';
import SearchBox from '../components/SearchBox/SearchBox';
import NoteList from '../components/NoteList/NoteList';
import Pagination from '../components/Pagination/Pagination';
import { NoteModal } from '../components/NoteModal/NoteModal';
import type { FetchNotesResponse } from '../lib/api';
import { useDebounce } from 'use-debounce';
import css from './page.module.css';

export default function App() {
  const [page, setPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearchTerm], 
    queryFn: () => fetchNotes(page, 12, debouncedSearchTerm),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onSearch={handleSearchChange} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isModalOpen && (
        <NoteModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
          }}
        />
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      {data && data.notes.length > 0 && (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </>
  );
}