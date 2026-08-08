import { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import ExerciseButton from "./ExerciseButton";

 //PU: { fullName: 'Push Ups', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
export default function ExerciseBlock({ newDay, setNewDay, columeName }) {

    
    function writeUserChoice() {
        setNewDay(prev => ({
            ...prev,
            PU: { 
                fullName: 'Push Ups', 
                reps1: { color: '', value: 0 }, 
                rest1: { color: '', value: 0 }, 
                reps2: { color: '', value: 0 }, 
                rest2: { color: '', value: 0 } 
            },
        }
    ))
    return;
    }

    return (
            <View style={styles.exerciseBody}>
                <Text style={styles.exerciseHeader}>{columeName}</Text>
                <ExerciseButton />
            </View>

    )
};

const styles = StyleSheet.create({
   
    exerciseBody: {
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 5,
        height:"98%",
        width:"30%",
        margin: 5,
        backgroundColor: '#3D458F',
    },
    exerciseHeader: {
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        height: '4%',
        width: '90%',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
        
    }
});