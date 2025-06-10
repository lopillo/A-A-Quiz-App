# A&A Quiz App

This project is a simple quiz application built with [Expo](https://expo.dev) and React Native. It showcases a minimal navigation flow with a home screen, quiz questions and a results view that awards badges based on your score. Questions and high score data are stored locally so you can practise even without a network connection.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npx expo start
   ```
3. The CLI will offer options to open the app in a development build, simulator/emulator or Expo Go.

To run the Jest test suite use:
```bash
npm test
```

## Features

- React Navigation based stack (`HomeScreen`, `QuizScreen`, `ResultScreen`)
- Tracks a persistent high score using AsyncStorage
- Review mode for incorrectly answered questions
- Badge system that rewards bronze, silver or gold depending on the final score
- Works on Android, iOS and the web via Expo

## Learn more

See the [Expo documentation](https://docs.expo.dev/) for more details on building, deploying and extending the app.


## License

This project is licensed under the [MIT License](LICENSE).
