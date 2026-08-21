import { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import ExerciseBlock from "./ExerciseBlock";
import { WorkoutDay } from "../../db/schemas";
import { useQuery } from "../../db/realm";



export default function ExerciseMain({ newDay, setNewDay }) {

    const allTemplate = useQuery('WorkoutTemplate');
    //console.log("allTemplate: ", allTemplate)
    const allCategories= [...new Set(allTemplate.map(template => template.category))]
    console.log("allCategories: ", allCategories);

    return (
        <View style={styles.exerciseMainBody}>
            <ExerciseBlock categories={allCategories}/>
            {/*
            тут будет еще один блок с категориями, ток с иконками
            */}
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
        justifyContent: 'center'
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