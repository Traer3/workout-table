import { useState } from "react";
import { Pressable, View, StyleSheet, Text, FlatList } from "react-native";
import ExerciseButton from "./ExerciseButton";
import { useCallback } from "react";

export default function ExerciseBlock({ categories }) {
    console.log("categories: ", categories)
    //const test = ["Forearms", "Arms", "Core", "Back", "Legs", "Forearms2", "Arms2", "Core2", "Back2", "Legs2", "Forearms3", "Arms4", "Core5", "Back6", "Legs7"]
    const renderItem = useCallback(({ item, index }) => (
        <ExerciseButton
            specialName={item}
        />
    ));

    return (
        <View style={styles.exerciseBody}>
            <FlatList
                style={styles.flatListConteiner}
                data={categories}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>

    )
};

const styles = StyleSheet.create({

    exerciseBody: {
        //borderColor: '#2E346E',
        borderWidth: 0.1,
        borderRadius: 5,
        height: "98%",
        width: "40%",
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
        justifyContent: 'center',
        alignItems: 'center',

    },
    flatListConteiner: {
        height: "100%",
        width: '100%',
        borderWidth: 0.1,
      },
});