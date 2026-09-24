import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import ExerciseBlock from "./ExerciseBlock";
import { useQuery, useRealm } from "../../db/realm";
import ExerciseBlockIcons from "./ExerciseBlockIcons";
import ExerciseColumnHolder from "./ExerciseColumnHolder";
import { useDatabase } from "../../../DatabaseContext";
import ExerciseButton from "./ExerciseButton";
import ChoiceAnswer from "./ChoiceAnswer";

export default function ExerciseMain({ newDay, setNewDay }) {
    const { categories, presetsHistory, getFormattedDate, workoutTemplate, checkHours, getCurrentDate } = useDatabase();
    const presetsHistoryData = useQuery(presetsHistory)
    const workoutTemplateData = useQuery(workoutTemplate);
    const realm = useRealm()
    const [index, setIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedExercises, setSelectedExercises] = useState(new Set())
    const [selectedCategory, setSelectedCategory] = useState(null)

    const currentDate = getCurrentDate()

    useEffect(() => {
        if (presetsHistoryData && presetsHistoryData.length > 0 && presetsHistoryData[0]?.exercise) {
            setSelectedExercises(presetsHistoryData[0].exercise.map(exercis => exercis.fullName))
            setSelectedCategory(presetsHistoryData[0].exercise.map(element => element.category))

            const clearZeroIdPresets = checkHours(presetsHistoryData[0].timestamp, 12);
            if (clearZeroIdPresets) {
                zeroIdSave()
            }
        }
    }, [presetsHistoryData, activeCategory])


    const initialGrouped = categories.reduce((accumulator, category) => {
        accumulator[category] = [];
        return accumulator;
    }, {});


    const groupedTemplates = workoutTemplateData.reduce((accumulator, template) => {
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
    }, [categories])

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
            const exercises = assembleExercises(nextSet)
            zeroIdSave(exercises);
            return nextSet;
        })
    }, []);

    function assembleExercises(selectedExercises) {
        const exercises = []
        selectedExercises.forEach(elementName => {
            const foundExercise = realm.objects(workoutTemplate)
                .filtered('exercise.fullName == $0', elementName)[0];
            if (foundExercise) {
                exercises.push(foundExercise.exercise)
            }
        });
        return exercises;
    }


    const zeroIdSave = (userData) => {
        let exercises = userData;
        if (!userData || userData.length < 0) {
            exercises = [{
                "category": null,
                "fullName": "",
                "reps1": { color: '', value: 0 }, "reps2": { color: '', value: 0 }, "rest1": { color: '', value: 0 }, "rest2": { color: '', value: 0 }
            }]
        }
        realm.write(() => {
            realm.create(presetsHistory, {
                id: 0,
                timestamp: currentDate,
                exercise: exercises
            }, 'modified')
        });
    }


    return (
        <View style={styles.exerciseMainBody}>
            {activeCategory ?
                <View style={{
                    borderColor: 'red',
                    borderWidth: 1,
                    overflow: 'hidden',
                    height: '100%'
                }}>
                    <ExerciseBlockIcons
                        categories={categories}
                        specialFunction={changeIndex}
                        colorFunction={handelActiveButtons}
                        selectedCategory={selectedCategory}
                    />
                    <ExerciseColumnHolder
                        groupedTemplates={groupedTemplates}
                        categories={categories}
                        index={index}
                        colectAllExercises={colectAllExercises}
                        selectedExercises={selectedExercises}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                    <View style={{
                        //borderColor:'yellow',
                        //borderWidth:1,
                        height: '7%'
                    }}>
                        <ChoiceAnswer
                            setActiveCategory={setActiveCategory}
                            selectedExercises={selectedExercises}
                            assembleExercises={assembleExercises}

                        />
                    </View>
                </View>
                :
                <View style={{ alignItems: 'center' }}>
                    <ExerciseBlock
                        categories={categories}
                        colorFunction={handelActiveButtons}
                        specialFunction={changeIndex}
                        selectedCategory={selectedCategory}
                    />
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