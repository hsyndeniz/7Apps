import { create } from 'zustand';

interface SearchStore {
	searchQuery: string;
	currentPage: number;
	setSearchQuery: (query: string) => void;
	setCurrentPage: (page: number) => void;
	resetPagination: () => void;
}

export const useSearchStore = create<SearchStore>(set => ({
	searchQuery: '',
	currentPage: 1,
	setSearchQuery: query => set({ searchQuery: query, currentPage: 1 }), // Reset page on new search
	setCurrentPage: page => set({ currentPage: page }),
	resetPagination: () => set({ currentPage: 1 }),
}));
