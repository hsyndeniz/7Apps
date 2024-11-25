import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
	TextInput,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useCharacters } from '@/hooks/useCharacters';
import { useSearchStore } from '@/store';
import { Character } from '@/store/api';

const CharacterList = () => {
	const scrollViewRef = useRef(null);

	const { data, isLoading } = useCharacters();
	const { searchQuery, setSearchQuery, selectedCharacters, setSelectedCharacters } = useSearchStore();
	const [isFocused, setIsFocused] = useState(false);

	const toggleCharacterSelection = (character: Character) => {
		if (selectedCharacters.some(c => c.id === character.id)) {
			setSelectedCharacters(selectedCharacters.filter(c => c.id !== character.id));
		} else {
			setSelectedCharacters([...selectedCharacters, character]);
		}
	};

	const handleSearchSubmit = () => {
		if (searchQuery.trim()) setSearchQuery('');
	};

	const renderChip = (character: Character) => (
		<View key={character.id} style={styles.chip}>
			<Text style={styles.chipText}>{character.name}</Text>
			<TouchableOpacity onPress={() => toggleCharacterSelection(character)}>
				<Text style={styles.chipClose}>×</Text>
			</TouchableOpacity>
		</View>
	);

	const renderCharacterItem = ({ item }: { item: Character }) => (
		<TouchableOpacity style={styles.characterItem}>
			<Checkbox
				style={styles.checkbox}
				value={selectedCharacters.some(c => c.id === item.id)}
				onValueChange={() => toggleCharacterSelection(item)}
				color="#4630EB"
			/>
			<Image source={{ uri: item.image }} style={styles.characterImage} />
			<View style={styles.characterInfo}>
				<Text style={styles.characterName}>{item.name}</Text>
				<Text style={styles.episodeCount}>{item.episode.length} episodes</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={[styles.searchContainer, isFocused && styles.searchFocused]}>
				<ScrollView
					ref={scrollViewRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.chipScroll}
					contentContainerStyle={styles.chipContent}
					onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}>
					{selectedCharacters.map(renderChip)}
					<TextInput
						style={styles.searchInput}
						placeholder="Search"
						placeholderTextColor="#666"
						value={searchQuery}
						onChangeText={setSearchQuery}
						onSubmitEditing={handleSearchSubmit}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					/>
				</ScrollView>
				{isLoading ? <ActivityIndicator size="small" color="#000" /> : <Text style={styles.dropdownIcon}>▼</Text>}
			</View>
			<FlatList
				data={data?.results}
				renderItem={renderCharacterItem}
				keyExtractor={item => item.id.toString()}
				style={styles.list}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
		padding: 8,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#ddd',
	},
	searchFocused: { borderColor: '#0066cc' },
	chipScroll: { maxHeight: 40 },
	chipContent: { alignItems: 'center', paddingVertical: 4 },
	chip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginRight: 6,
	},
	chipText: { fontSize: 14 },
	chipClose: { fontSize: 16, color: '#666', marginLeft: 4 },
	searchInput: { flex: 1, fontSize: 16, paddingHorizontal: 8, height: 40 },
	dropdownIcon: { fontSize: 12, color: '#666' },
	list: { flex: 1 },
	characterItem: {
		flexDirection: 'row',
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		alignItems: 'center',
	},
	characterImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
	characterInfo: { flex: 1 },
	characterName: { fontSize: 16, fontWeight: '500' },
	episodeCount: { fontSize: 14, color: '#666', marginTop: 4 },
	checkbox: { marginRight: 8 },
});

export default CharacterList;
