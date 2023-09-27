import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from './src/screens/home';
import {Quiz, QuizScreen} from './src/screens/quiz';
import {QuizResult} from './src/screens/quiz-result';

export type RootStackParamList = {
  Home: undefined;
  QuizScreen: {category: string; quizzes: Quiz[]};
  QuizResult: {correctAnswers: number; totalQuestions: number};
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Quizes'}} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="QuizResult" component={QuizResult} options={{headerLeft: () => null}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
