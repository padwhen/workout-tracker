import { Text, View, StyleSheet } from 'react-native';

export const ExerciseListItem = ({item, index}) => (
  <View style={styles.exerciseContainer}>
    <Text style={styles.exerciseName}>
      {index + 1}.{item.name}
    </Text>
    <Text style={styles.exerciseSubtitle}>
      <Text style={styles.subValue}>{item.muscle}</Text> | <Text style={styles.subValue}>{item.equipment}</Text>
    </Text>        
  </View>
);

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    gap: 5,
    marginHorizontal: 2,
    // shadow from ethercreative.github.io/react-native-shadow-generator
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },  
  exerciseName: {
    fontSize: 20, 
    fontWeight: '500',
  },
  exerciseSubtitle: {
    color: 'dimgray'
  },
  subValue: {
    textTransform: 'capitalize'
  }
});
