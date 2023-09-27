import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface QuizCardProps {
  quiz: {
    id: number;
    name: string;
  };
  onPress: () => void;
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const QuizCard = ({quiz, onPress}: QuizCardProps) => {
  const [backgroundColor, setBackgroundColor] = useState('#000');

  useEffect(() => {
    const randomColor = getRandomColor();
    setBackgroundColor(randomColor);
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, {backgroundColor}]}>
      <Text style={styles.title}>{quiz.name}</Text>
    </TouchableOpacity>
  );
};

export {QuizCard};
