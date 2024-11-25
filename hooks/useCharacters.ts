import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../store/api';
import { useSearchStore } from '../store';

export const useCharacters = () => {
	const searchQuery = useSearchStore(state => state.searchQuery);
	const currentPage = useSearchStore(state => state.currentPage);

	return useQuery({
		queryKey: ['characters', searchQuery, currentPage],
		queryFn: () => fetchCharacters(searchQuery, currentPage),
		staleTime: 5 * 60 * 1000,
		retry: 2,
		select: data => ({
			info: data.info,
			results: data.results || [],
		}),
	});
};
