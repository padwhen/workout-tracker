import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { ExerciseListItem } from '../components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request'
import client from '../graphqlClient'
import { Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthContext';

const exercisesQuery = gql`
  query myQuery{
    myQuery{
      muscle
      name
      equipment
  }
}`

export default function ExercisesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return client.request(exercisesQuery)
    }
  })

  const { username } = useAuth()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>
  }


  if (!username) {
    return <Redirect href={'/auth'} />    
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={data.myQuery}
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
    justifyContent: 'center',
    padding: 10,
  }
})


