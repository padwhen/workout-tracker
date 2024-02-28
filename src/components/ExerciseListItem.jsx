import { Text, View, StyleSheet } from 'react-native';

export const ExerciseListItem = ({item, index}) => (
  <View style={styles.exerciseContainer}>
    <Text style={styles.exerciseName}>
      {index + 1}.{item.name}
    </Text>
    <Text style={styles.exerciseSubtitle}>
      {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()}
    </Text>        
  </View>
);

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    gap: 5
  },  
  exerciseName: {
    fontSize: 20, 
    fontWeight: '500',
  },
  exerciseSubtitle: {
    color: 'dimgray'
  }
});
