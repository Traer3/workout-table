import { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ExerciseButton from "./ExerciseButton";
import { useCallback } from "react";

const ExerciseBlock = memo(({ categories , colorFunction, activeCategory}) => {
    const renderItem = useCallback(({ item, index }) => (
        <ExerciseButton
            specialName={item}
            colorFunction={colorFunction}
            activeCategory={activeCategory}
        />
    ),[activeCategory, colorFunction]);

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
});
export default ExerciseBlock;

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