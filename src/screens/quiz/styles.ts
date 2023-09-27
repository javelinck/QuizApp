import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  option: {
    backgroundColor: '#333',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});
