import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import {RootStackParamList} from '../../../App';
import {SafeAreaView} from 'react-native-safe-area-context';

type QuizResultRouteProp = RouteProp<RootStackParamList, 'QuizResult'>;

const QuizResult = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<QuizResultRouteProp>();
  const {correctAnswers, totalQuestions} = route.params;

  const handleRestartQuiz = () => navigation.navigate('Home');

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>
          {correctAnswers > totalQuestions / 2 ? '🥳🥳CONGRATULATIONS!!!🎉🎉' : 'Oops, Good luck next time!'}
        </Text>
        <Text style={styles.result}>
          {correctAnswers} / {totalQuestions} correct answers
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRestartQuiz}>
        <Text style={styles.buttonTitle}>New Quiz</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export {QuizResult};
