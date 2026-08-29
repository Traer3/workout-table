import { View, StyleSheet } from "react-native";
import ExerciseButton from "./ExerciseButton";
import { memo, useCallback, } from "react";

const ExerciseColumnForm = memo(({ specialName, specialFunction, selectedExercises }) => {

    const ColumnButton = useCallback(() => {
        return (
            <ExerciseButton
                specialName={specialName}
                specialFunction={specialFunction}
                activeCategory={selectedExercises}
            />
        )
    }, [selectedExercises])

    return (
        <View style={[styles.exerciseMainBody]}>
            <View style={{ alignItems: 'center' }}>
                <ColumnButton />
            </View>
        </View>
    )
})

export default ExerciseColumnForm;

const styles = StyleSheet.create({
    exerciseMainBody: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        height: "70",
        minWidth: '130',//37%
        //margin: 5,
        justifyContent: 'center',
        backgroundColor: '#3D458F',
        marginBottom: 5
    },
});