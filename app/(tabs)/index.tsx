import { View } from 'react-native';
import CharacterList from '@/components/CharacterList';

export default function HomeScreen() {
	return (
		<View style={{ flex: 1 }}>
			<CharacterList />
		</View>
	);
}
