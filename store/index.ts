import { create } from 'zustand';
import { Character } from './api';

interface SearchStore {
	searchQuery: string;
	currentPage: number;
	characters: Character[];
	selectedCharacters: Character[];
	setSearchQuery: (query: string) => void;
	setCurrentPage: (page: number) => void;
	resetPagination: () => void;
	setCharacters: (characters: Character[]) => void;
	setSelectedCharacters: (characters: Character[]) => void;
}

export const useSearchStore = create<SearchStore>(set => ({
	searchQuery: '',
	currentPage: 1,
	characters: [],
	selectedCharacters: [],
	setSearchQuery: query => set({ searchQuery: query, currentPage: 1 }), // Reset page on new search
	setCurrentPage: page => set({ currentPage: page }),
	resetPagination: () => set({ currentPage: 1 }),
	setCharacters: characters => set({ characters }),
	setSelectedCharacters: characters => set({ selectedCharacters: characters }),
}));
