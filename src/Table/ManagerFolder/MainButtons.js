import { Pressable, StyleSheet, Text, View } from "react-native"
import { useDatabase } from "../../../DatabaseContext";
import { useMaxId } from "../../hooks/useMaxId";
import { useRealm } from "../../db/realm";
import { useState } from "react";

export default function MainButtons({ zeroIdSave, setCurretnPreset, onAddingNewExercise, }) {
    const { workoutTable } = useDatabase()
    const { id: nexWorkoutId } = useMaxId(workoutTable)
    const realm = useRealm();

    const [newExercise, setNewExercise] = useState(false)
    const [ChangeWorkout, setChangeWorkout] = useState(false);
    const [clear, setClear] = useState(false);


    const clearMenu = () => {
        setClear(!clear)
        setCurretnPreset(null)
        zeroIdSave()

    }

    const changeWorkout = () => {
        setChangeWorkout(!ChangeWorkout)
        const lastWorkout = realm.objectForPrimaryKey(workoutTable, nexWorkoutId - 1)
        const lastExercises = lastWorkout.exercises;
        const changingWorkout = { ...lastWorkout, tableName: workoutTable }
        setCurretnPreset(changingWorkout)
        zeroIdSave(lastExercises)
        //setWriteName(false)
        //console.log("Changing workout")
        //console.log("currentPreset changeWorkout: ", changingWorkout)

    }

    const onCreatingNewExercise = () => {
        //console.log("Pressssed")
        onAddingNewExercise()
        setNewExercise(!newExercise)
    }

    const onPressOut = () => {
        setTimeout(() => {
            setChangeWorkout(false)
            setClear(false)
        }, 200)
    }

    return (
        <View
            style={styles.dateBlock}
        >
            <Pressable
                style={[styles.pressableCell, { backgroundColor: clear ? 'rgba(76, 175, 80, 0.2)' : 'transparent', }]}
                onPress={clearMenu}
                onPressOut={onPressOut}
            >
                <Text style={{
                    fontWeight: '600',
                    fontSize: 15,
                    color: 'white'
                }}>Clear</Text>
            </Pressable>

            <Pressable
                style={[styles.pressableCell, { backgroundColor: ChangeWorkout ? 'rgba(76, 175, 80, 0.2)' : 'transparent', }]}
                onPress={changeWorkout}
                onPressOut={onPressOut}
            >
                <Text style={{
                    fontWeight: '600',
                    fontSize: 11,
                    color: 'white'
                }}>Change workout</Text>
            </Pressable>

            <Pressable
                style={[styles.pressableCell, { backgroundColor: newExercise ? 'rgba(76, 175, 80, 0.2)' : 'transparent', }]}
                onPress={onCreatingNewExercise}
            >
                <Text style={{
                    fontWeight: '600',
                    fontSize: 11,
                    color: 'white'
                }}>new Exercise</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    dateBlock: {
        // borderColor: 'red',
        // borderWidth: 1,
        borderRadius: 5,
        height: '6%',
        backgroundColor: '#3D458F',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'green'
        flexDirection: "row"
    },
    pressableCell: {
        borderColor: '#2E346E',
        borderWidth: 2,
        borderRadius: 5,
        height: '40',
        width: '80',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
});