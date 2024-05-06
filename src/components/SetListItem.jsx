import { View, Text } from "react-native";
import { formatDistanceToNow } from 'date-fns'

const SetListItem = ({ set }) => {
    const timeStamp = parseInt(set._id.substr(0, 8), 16) * 1000;
    const createdAt = new Date(timeStamp)
    return (
        <View style={{ backgroundColor: 'white',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5, gap: 5}}>
            <Text style={{ fontWeight: 'bold' }}>
                {set.reps} reps x {set.weight} kg(s) {' '}
            </Text>            
            <Text style={{ color: 'gray' }}>
                {formatDistanceToNow(createdAt.toISOString())} ago
            </Text>
        </View>

    )
}

export default SetListItem