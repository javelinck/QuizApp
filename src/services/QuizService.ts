import axios from 'axios';
import {Quiz} from '../screens/quiz';

const BASE_URL = 'https://opentdb.com';

export interface QuizCategory {
  id: number;
  name: string;
}

export const fetchQuizCategories = async (): Promise<QuizCategory[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/api_category.php`);
    let {trivia_categories} = await res.data;
    return trivia_categories.map((data: {id: any; name: any}) => {
      return {
        id: data.id,
        name: data.name,
      };
    });
  } catch (error) {
    console.error('Error fetching quiz categories:', error);
    return [];
  }
};

export const shuffle = (array: any[]) => [...array].sort(() => Math.random());

export const fetchQuizzesByCategory = async (categoryId: number): Promise<{category: string; quizzes: Quiz[]}> => {
  try {
    const res = await axios.get(`${BASE_URL}/api.php?amount=${5}&category=${categoryId}`);
    let {results} = await res.data;
    return {
      category: results[0].category,
      quizzes: results.map((data: {question: string; correct_answer: string; incorrect_answers: string[]}) => {
        return {
          question: data.question,
          answer: data.correct_answer,
          options: shuffle(data.incorrect_answers.concat(data.correct_answer)),
        };
      }),
    };
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return {category: '', quizzes: []};
  }
};
