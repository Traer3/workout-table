import { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import ExerciseBlock from "./ExerciseBlock";
import { WorkoutDay } from "../../db/schemas";


 //PU: { fullName: 'Push Ups', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
export default function ExerciseMain({ newDay, setNewDay }) {

    console.log("schema: ", WorkoutDay.schema)
    return (
        <View style={styles.exerciseMainBody}>
            <ExerciseBlock newDay={newDay} setNewDay={setNewDay} columeName={'Arms'}/>
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody:{
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        height:"80%",
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseBody: {
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 5,
        height:"98%",
        width:"30%",
        margin: 5,
        backgroundColor: '#3D458F',
    },
});