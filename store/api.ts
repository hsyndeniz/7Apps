const BASE_URL = 'https://rickandmortyapi.com/api';

export interface ResourceBase {
	id: number;
	name: string;
	url: string;
	created: string;
}

export interface CharacterLocation {
	name: string;
	url: string;
}

export interface Character extends ResourceBase {
	status: 'Dead' | 'Alive' | 'unknown';
	species: string;
	type: string;
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
	origin: CharacterLocation;
	location: CharacterLocation;
	image: string;
	episode: string[];
}

export interface Response {
	info: {
		count: number;
		pages: number;
		next: string;
		prev: string;
	};
	results: Character[];
}

export async function fetchCharacters(name: string, page = 1): Promise<Response> {
	const params = new URLSearchParams();
	params.set('name', name);
	params.set('page', page.toString());

	const url = `${BASE_URL}/character?${params.toString()}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Failed to fetch characters');
	}
	return response.json();
}
