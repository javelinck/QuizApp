import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import {RootStackParamList} from '../../../App';
import {SafeAreaView} from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';

export interface Quiz {
  question: string;
  answer: string;
  options: string[];
}

type QuizScreenRouteProp = RouteProp<RootStackParamList, 'QuizScreen'>;

const replaceHtmlQuote = (originalText: string) =>
  originalText.replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&#039;/g, "'");

const showSnackBar = (isCorrect: boolean) => {
  Snackbar.show({
    text: isCorrect ? 'Correct' : 'Wrong',
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: isCorrect ? 'green' : 'red',
  });
};

const QuizScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<QuizScreenRouteProp>();
  const {category, quizzes} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Quiz | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category,
    });
  }, [navigation, category]);

  useEffect(() => {
    if (quizzes.length > 0) {
      setCurrentQuestion(quizzes[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, quizzes]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const totalQuestions = quizzes.length;

      navigation.navigate('QuizResult', {correctAnswers, totalQuestions});
    }
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === currentQuestion?.answer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    showSnackBar(selectedAnswer === currentQuestion?.answer);
    handleNextQuestion();
  };

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <Text style={styles.question}>{replaceHtmlQuote(currentQuestion.question)}</Text>
      {currentQuestion.options?.map(answer => (
        <TouchableOpacity key={answer} style={styles.option} onPress={() => handleAnswer(answer)}>
          <Text style={styles.optionText}>{replaceHtmlQuote(answer)}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export {QuizScreen};
