import { GraphQLClient, gql } from "graphql-request";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from '../graphqlClient'


const setsQuery = gql`
query sets($exercise: String!) {
    sets(exercise: $exercise) {
        documents{
            _id
            exercise
            reps
            weight
        }
    }
}
`

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['sets', exerciseName],
        queryFn: () => graphqlClient.request(setsQuery, {exercise: exerciseName})
    });

    if (isLoading) {
        return <ActivityIndicator />;
    }

    return (
        <FlatList
            data={data.sets.documents}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id} // Ensure each item has a unique key
            renderItem={({ item }) => (
                <SetItem reps={item.reps} weight={item.weight} />
            )}
        />
    );
};

const SetItem = ({ reps, weight }) => (
    <Text
        style={{
            backgroundColor: 'white',
            marginVertical: 5,
            padding: 10,
            borderRadius: 5,
            overflow: 'hidden',
        }}
    >
        {reps} x {weight}{' '}
    </Text>
);

export default SetsList;



