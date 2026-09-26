import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import ExerciseBlock from "./ExerciseBlock";
import { useQuery } from "../../db/realm";
import ExerciseBlockIcons from "./ExerciseBlockIcons";
import ExerciseColumnHolder from "./ExerciseColumnHolder";
import { useDatabase } from "../../../DatabaseContext";
import ChoiceAnswer from "./ChoiceAnswer";
import { useMaxId } from "../../hooks/useMaxId";

export default function ExerciseMain({ setSelectedExercises, selectedExercises, colectAllExercises, assembleExercises, zeroIdSave, saveUserInput, curretnPreset, setCurretnPreset }) {
    const { categories, presetsHistory, workoutTemplate, checkHours, workoutTable } = useDatabase();
    const presetsHistoryData = useQuery(presetsHistory)
    const workoutTemplateData = useQuery(workoutTemplate);
    const [index, setIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { id: nexId } = useMaxId(workoutTable);

    useEffect(() => {
        if (presetsHistoryData && presetsHistoryData.length > 0 && presetsHistoryData[0]?.exercises) {

            setSelectedExercises(presetsHistoryData[0].exercises.map(exercis => exercis.fullName))
            setSelectedCategory(presetsHistoryData[0].exercises.map(element => element.category)) 

            const clearZeroIdPresets = checkHours(presetsHistoryData[0].timestamp, 12);
            if (clearZeroIdPresets) {
                zeroIdSave()
            }
        }
    }, [presetsHistoryData, activeCategory, curretnPreset])


    const initialGrouped = categories.reduce((accumulator, category) => {
        accumulator[category] = [];
        return accumulator;
    }, {});


    const groupedTemplates = workoutTemplateData.reduce((accumulator, template) => {
        const cat = template.exercise.category;
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

    const saveUserChoise = () => {
        const exercises = assembleExercises(selectedExercises);
        
        if(curretnPreset.name !== null){
            const {name , id} = curretnPreset
            
            saveUserInput(presetsHistory, exercises, id, name)
            setCurretnPreset(null)
            // console.log("Preset is updated! !")
            return;
        }else{
            // console.log("Workout is save!")
            saveUserInput(workoutTable, exercises, nexId)
        }
    }

    const clearActiveCategory = () => {
        if(curretnPreset.id > 0){
            console.log("Exiting current preset")
            setCurretnPreset(null)
        }
        setActiveCategory(null)
    }


    return (
        <View style={styles.exerciseMainBody}>
            {activeCategory ?
                <View style={{
                    // borderColor: 'red',
                    // borderWidth: 1,
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
                            onCansel={clearActiveCategory}
                            onSave={saveUserChoise}
                            //ебануть условие для изменения присета 
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