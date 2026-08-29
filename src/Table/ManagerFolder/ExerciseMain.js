import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ExerciseBlock from "./ExerciseBlock";
import { useQuery } from "../../db/realm";
import ExerciseBlockIcons from "./ExerciseBlockIcons";
import ExerciseColumnHolder from "./ExerciseColumnHolder";
import { useDatabase } from "../../../DatabaseContext";

export default function ExerciseMain({ newDay, setNewDay }) {
    const { categories } = useDatabase();
    const allTemplates = useQuery('WorkoutTemplate');
    const [index, setIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);
    const selectedExercises = new Set()
    

    const initialGrouped = categories.reduce((accumulator, category) => {
        accumulator[category] = [];
        return accumulator;
    }, {});

    const groupedTemplates = allTemplates.reduce((accumulator, template) => {
        const cat = template.category;
        if (cat && accumulator[cat]) {
            accumulator[cat].push(template);
        } else {
            accumulator["Unique"].push(template);
        }

        return accumulator;
    }, initialGrouped);

    const changeIndex = useCallback((newName) => {
        setIndex(categories.indexOf(newName));
    }, [])

    const handelActiveButtons = useCallback((categoryName) => {
        setActiveCategory(categoryName);
    }, []);

    const colectAllExercises = useCallback((exerciseName) => {
        setSelectedExercises((prev) => {
            const nextSet = new Set(prev);
            if (nextSet.has(exerciseName)) {
                nextSet.delete(exerciseName);
            } else {
                nextSet.add(exerciseName);
            }
            return nextSet;
        })
    }, []);


    return (
        <View style={styles.exerciseMainBody}>
            {activeCategory ? //можно чет лучше придумать с возможностью возвращатся , тип нажал на присет и вернулся или случайно вышел , а оно сохранило
                <>
                    <ExerciseBlockIcons categories={categories} specialFunction={changeIndex} colorFunction={handelActiveButtons} activeCategory={activeCategory} />
                    <ExerciseColumnHolder
                        groupedTemplates={groupedTemplates}
                        categories={categories}
                        index={index}
                        colectAllExercises={colectAllExercises}
                        selectedExercises={selectedExercises}
                    />
                </>
                :
                <View style={{ alignItems: 'center' }}>
                    <ExerciseBlock categories={categories} colorFunction={handelActiveButtons} activeCategory={activeCategory} />
                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody: {
        //borderColor: 'red',
        borderWidth: 0.1,
        borderRadius: 5,
        height: "80%",
        margin: 5,
    },
    exerciseBody: {
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 5,
        height: "98%",
        width: "30%",
        margin: 5,
        backgroundColor: '#3D458F',
    },
});