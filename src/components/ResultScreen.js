import { View, Text, Button } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { score = 0, total = 0 } = route.params || {};
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <Text>You scored {score} out of {total}!</Text>
      <Button title="Play Again" onPress={() => navigation.replace('Quiz')} />
    </View>
  );
}
