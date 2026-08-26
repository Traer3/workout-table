import { useState, useCallback, memo } from "react";
import { Pressable, View, StyleSheet, Text, FlatList } from "react-native";
import ExerciseButton from "./ExerciseButton";

const ExerciseBlockIcons = memo(({ categories, specialFunction, colorFunction, activeCategory }) => {
    const renderItem = useCallback(({ item, index }) => (
        <ExerciseButton
            specialName={item}
            iconName={item}
            specialFunction={specialFunction}
            colorFunction={colorFunction}
            activeCategory={activeCategory}
        />
    ), [specialFunction, activeCategory, colorFunction]);

    return (
        <View style={styles.exerciseBody}>
            <FlatList
                style={styles.flatListConteiner}
                contentContainerStyle={styles.flatListContet}
                data={categories}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}

            />
        </View>

    )
});
export default ExerciseBlockIcons;

const styles = StyleSheet.create({
    exerciseBody: {
        borderColor: '#2E346E', //#2E346E
        borderWidth: 0.1,
        borderRadius: 5,
        height: "8%",
        width: "100%",
        //margin: 5,
        backgroundColor: '#3D458F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListConteiner: {
        height: "100%",
        width: '100%',
        borderWidth: 0.1,
        //borderColor:'green',       
    },
    flatListContet: {
        justifyContent: 'center',
        alignItems: 'center',

    },
});