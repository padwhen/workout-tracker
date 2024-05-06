import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { ExerciseListItem } from '../components/ExerciseListItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request'
import client from '../graphqlClient'
import { Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthContext';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

const exercisesQuery = gql`
  query myQuery($name: String, $offset: Int){
    myQuery(name: $name, offset: $offset) {
      muscle
      name
      equipment
  }
}`

export default function ExercisesScreen() {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search.trim(), 1000)

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['exercises', debouncedSearchTerm],
    queryFn: ({ pageParam }) => {
      return client.request(exercisesQuery, { offset: pageParam, name: debouncedSearchTerm })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length * 10,

  })

  const { username } = useAuth()

  const loadMore = () => {
    if (isFetchingNextPage) {
      return
    }
    fetchNextPage()
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>
  }


  if (!username) {
    return <Redirect href={'/auth'} />    
  }

  const exercises = data?.pages.flatMap((page) => page.myQuery)

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        headerSearchBarOptions: {
          placeholder: 'Search...',
          onChangeText: (event) => setSearch(event.nativeEvent.text),
          hideWhenScrolling: false,
        }
      }} />
      <FlatList 
        data={exercises}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item}) => <ExerciseListItem item={item} />}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
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
    paddingTop: 160
  }
})


