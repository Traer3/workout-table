import { Pressable, StyleSheet, Text, View } from "react-native"
import { useDatabase } from "../../../DatabaseContext";
import { useEffect, useState } from "react";
import { useMaxId } from "../../hooks/useMaxId";
import { useRealm } from "../../db/realm";


export default function MainButtons({zeroIdSave, setCurretnPreset, }) {
    const { workoutTable } = useDatabase()
    const { id: nexWorkoutId } = useMaxId(workoutTable)
    const realm = useRealm();
    const clearMenu = () => {
        setCurretnPreset(null)
        zeroIdSave()
    }

    const changeWorkout = () => {
        const lastWorkout = realm.objectForPrimaryKey(workoutTable, nexWorkoutId - 1)
        const lastExercises = lastWorkout.exercises;
        const changingWorkout = {...lastWorkout, tableName: workoutTable}
        setCurretnPreset(changingWorkout)
        zeroIdSave(lastExercises)
        //setWriteName(false)
        console.log("Changing workout")
        console.log("currentPreset changeWorkout: ", changingWorkout )
    }
  
    return (
        <View
            style={styles.dateBlock}
        >
            <Pressable 
                style={styles.pressableCell}
                onPress={clearMenu}
                >
                <Text style={{
                    fontWeight: '600',
                    fontSize: 15,
                    color: 'white'
                }}>Clear</Text>
            </Pressable>

            <Pressable 
                style={styles.pressableCell}
                onPress={changeWorkout}
                >
                <Text style={{
                    fontWeight: '600',
                    fontSize: 11,
                    color: 'white'
                }}>Change workout</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    dateBlock: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        height: '6%',
        backgroundColor: '#3D458F',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'green'
        flexDirection:"row"
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