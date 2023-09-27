import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {fetchQuizCategories, fetchQuizzesByCategory} from '../../services/QuizService';
import {QuizCard} from '../../components/quiz-card';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';

interface Category {
  id: number;
  name: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [quizCategories, setQuizCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await fetchQuizCategories();
      setQuizCategories(categories);
    }

    fetchCategories();
  }, []);

  const handleQuizCardPress = async (categoryId: number) => {
    const {category, quizzes} = await fetchQuizzesByCategory(categoryId);
    navigation.navigate('QuizScreen', {category, quizzes});
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        numColumns={2}
        data={quizCategories}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <QuizCard key={item.id} quiz={item} onPress={() => handleQuizCardPress(item.id)} />}
      />
    </SafeAreaView>
  );
};

export {HomeScreen};
