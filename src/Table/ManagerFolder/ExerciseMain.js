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
    const { categories, presetsHistory } = useDatabase();
    const allTemplates = useQuery('WorkoutTemplate');
    const realm = useRealm()
    const [index, setIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedExercises ,setSelectedExercises] = useState(new Set())
    
    console.log(presetsHistory[0].exercise)

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
            //каждое действие юзера 
            const exercises = assembleExercises(nextSet)
            saveUserInput(exercises);
//console.log("nextSet: ", nextSet)
            return nextSet;
        })
    }, []);

    function assembleExercises(selectedExercises) {
        //console.log("selectedExercises: ", selectedExercises)
        const exercises = []
const lastIndex = presetsHistory.length - 1
const maxId = presetsHistory[lastIndex].id + 1
        selectedExercises.forEach(elementName => {
            //console.log("name: ", element)
            const foundExercise = realm.objects('WorkoutTemplate')
                                .filtered('exercise.fullName == $0', elementName)[0];
            if(foundExercise){
                //console.log("exercise: ", foundExercise.exercise)
                exercises.push(foundExercise.exercise)
            }
        });

        //console.log("exercises: ", exercises)
//saveUserInput(exercises, maxId)
        console.log("PRESET SAVED!")
        return exercises;
    }


    const saveUserInput = (exercises, id) => {
        const currentDate = Math.floor(Date.now() / 1000) 
        console.log("id: ", id)
        if(exercises && exercises.length > 0){
            if(id > 0){
                realm.write(() => {
                    realm.create('PresetsHistory', {
                        id:id,
                        timestamp: currentDate,
                        exercises:exercises
                    }, 'modified')
                });
              return;
            }
            realm.write(() => {
                realm.create('PresetsHistory', {
                    id:0,
                    timestamp: currentDate,
                    exercises:exercises
                }, 'modified')
            });
        }
    }


    return (
        <View style={styles.exerciseMainBody}>
            {activeCategory ? //можно чет лучше придумать с возможностью возвращатся , тип нажал на присет и вернулся или случайно вышел , а оно сохранило
                <View style={{
                    borderColor:'red',
                    borderWidth:1,
                    overflow:'hidden',
                    height:'100%'
                }}>
                    <ExerciseBlockIcons categories={categories} specialFunction={changeIndex} colorFunction={handelActiveButtons} activeCategory={activeCategory} />
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
                    height:'7%'
                }}> 
                    <ChoiceAnswer setActiveCategory={setActiveCategory} selectedExercises={selectedExercises} assembleExercises={assembleExercises}/>
                </View>
                </View>
                :
                <View style={{ alignItems: 'center' }}>
                    <ExerciseBlock categories={categories} colorFunction={handelActiveButtons} activeCategory={activeCategory} specialFunction={changeIndex}/>
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