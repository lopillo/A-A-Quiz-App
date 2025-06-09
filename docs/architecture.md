# Architecture Overview

This project is a small Expo/React Native application with three main screens managed by React Navigation. Component files live in `src/components` and the stack navigator is defined in `src/navigation/AppNavigator.tsx`.

## Main Components

- **HomeScreen** – Landing page showing the high score and a button to start the quiz. The high score is retrieved from local storage when the screen gains focus.
- **QuizScreen** – Presents questions from `src/data/questions.ts`. Answers are evaluated immediately and incorrect answers are queued for a review round. When all questions (and reviews) are completed, the result screen is shown.
- **ResultScreen** – Displays the final score and any earned badges. Provides a button to return to the Home screen.
- **BadgeDisplay** – Renders a list of earned badge icons used on the result screen.

## Data Flow

1. `HomeScreen` reads the stored high score using `getHighScore()` from `src/storage/highScore.ts`.
2. When the user starts a quiz, `QuizScreen` iterates through the questions array. Correct answers increment the score, while incorrect answers are pushed onto a review queue.
3. After answering all questions, any queued items are presented again in review mode until all are answered correctly.
4. On completion, `QuizScreen` compares the score with the saved high score and writes a new high score using `setHighScore()` if needed. Then navigation transitions to `ResultScreen` with the final score as parameters.
5. `ResultScreen` calculates earned badges based on the score percentage and renders them with `BadgeDisplay`. Pressing the button navigates back to `HomeScreen` where the updated high score is shown.

This simple flow keeps all state within the currently displayed screen and stores only the persistent high score in `AsyncStorage`.

