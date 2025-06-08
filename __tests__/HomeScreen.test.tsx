import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/components/HomeScreen';

it('renders Start Quiz button', () => {
  const navigation = { navigate: jest.fn() } as any;
  const { getByText } = render(<HomeScreen navigation={navigation} />);
  expect(getByText('Start Quiz')).toBeTruthy();
});
