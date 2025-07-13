import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '../components/HomeScreen';
import SelectionScreen from '../components/SelectionScreen';
import HighScoreScreen from '../components/HighScoreScreen';
import MedalBoardScreen from '../components/MedalBoardScreen';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import RoundSummaryScreen from '../components/RoundSummaryScreen';

import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="HighScore" component={HighScoreScreen} />
        <Stack.Screen name="MedalBoard" component={MedalBoardScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="RoundSummary" component={RoundSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
