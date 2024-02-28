import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import exercises from '../../assets/data/exercises.json'
import { ExerciseListItem } from '../components/ExerciseListItem';

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={exercises}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item, index}) => <ExerciseListItem item={item} index={index} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10,
  }
})


