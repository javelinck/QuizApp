import {Dimensions, StyleSheet} from 'react-native';

const sideSize = Dimensions.get('screen').width / 2 - 25;

export const styles = StyleSheet.create({
  card: {
    width: sideSize,
    height: sideSize,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
