import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const NewSetInput = () => {
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')

    const addSet = () => {
        console.warn('Add set: ', reps, weight)
        // Save data in the database
        setReps('')
        setWeight('')
    }
    return (
        <View style={styles.container}>
            <TextInput value={reps} keyboardType="numeric" onChangeText={setReps} placeholder="Reps" style={styles.input} />
            <TextInput value={weight} keyboardType="numeric" onChangeText={setWeight} placeholder="Weight" style={styles.input} />
            <Button title="Add" onPress={addSet} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        flex: 1, // Take half the space
        borderRadius: 5,
    }
})

export default NewSetInput;