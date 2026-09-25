import { Pressable, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useDatabase } from "../../../DatabaseContext";
import { useRealm } from "../../db/realm";
import { useMaxId } from "../../hooks/useMaxId";

export default function ChoiceAnswer({ setActiveCategory, selectedExercises, assembleExercises, saveUserInput }) {
    const [active, setActive] = useState(false)
    const { workoutTable } = useDatabase();

    const { id: nexId } = useMaxId(workoutTable)

    // const saveNewPreset = () => {
    //     if (exercises && exercises.length > 0) {
    //         console.log("exercises: ", exercises)
    //         console.log("id: ", id)
    //         // realm.write(() => {
    //         //     realm.create(presetsHistory, {
    //         //         id: id,
    //         //         timestamp: currentDate,
    //         //         exercise: exercises
    //         //     }, 'modified')
    //         // });
    //         // return;
    //     }
    // }

    const onPressIn = () => {
        setActive(true)
        const exercises = assembleExercises(selectedExercises);
        saveUserInput(workoutTable, exercises, nexId)
    }

    const onPressOut = () => {
        setTimeout(() => {
            setActive(false)
        }, 200)
    }
    return (
        <View style={styles.mainBody}>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: 'transparent', }]}
                onPressIn={() => setActiveCategory(null)}
            >
                <Text style={[styles.buttonText, { color: 'red' }]}> Cansel</Text>
            </Pressable>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: active ? 'rgba(76, 175, 80, 0.2)' : 'transparent', }]}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Text style={[styles.buttonText, { color: 'green' }]}>Start</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exerciseHeader: {
        //borderWidth:1,
        //borderColor:'blue',
        borderRadius: 5,
        height: "100%",
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontWeight: '600',
        fontSize: 25,
    }
});