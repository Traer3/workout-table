import { View, StyleSheet, FlatList } from "react-native";
import { memo, useCallback, useRef } from "react";
import ExerciseColumnForm from "./ExerciseColumnFrom";


const ExerciseColumn = memo(({ category, templates, colectAllExercises, selectedExercises, activeCategory }) => {
    const isActive = category === activeCategory;
    //console.log("isActive: ", isActive, " ", "category : ", category, " ", "activeCategory : ", activeCategory)
    const renderItem = useCallback(({ item }) => {
        const name = item.exercise.fullName
        return (
            <ExerciseColumnForm
                specialName={name}
                specialFunction={colectAllExercises}
                selectedExercises={selectedExercises}
            />
        )
    }, [selectedExercises, isActive]);
    return (
        <View style={[styles.exerciseMainBody]}>

            {!isActive && <View style={[styles.glassOverlay]} />}
            <FlatList
                style={styles.flatListConteiner}
                contentContainerStyle={styles.flatListContet}
                data={templates[category]}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}

            />
        </View>
    )
})
export default ExerciseColumn;

const styles = StyleSheet.create({
    exerciseMainBody: {
        //borderColor: 'red',
        borderWidth: 0.1,
        borderRadius: 5,
        height: "98%",
        width: "137",//37%
        margin: 5,
        //alignItems:'center',
        backgroundColor: '#3D458F',
    },

    flatListConteiner: {
        //height: "100%",
        //width: '100%',
        borderWidth: 0.1,
        //borderColor:'green',

    },
    flatListContet: {
        //justifyContent:'center',
        //alignItems:'center',
        //flexDirection:'row',

    },
    glassOverlay: {
        position: 'absolute',
        //borderRadius: 5,
        backgroundColor: 'rgba(61, 69, 143, 0.9)',
        backfaceVisibility: 'visible',
        height: "100%",
        width: '100%',
        zIndex: 999
    },
});