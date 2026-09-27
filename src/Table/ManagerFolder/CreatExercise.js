import { useCallback, useEffect, useState, useRef } from "react";
import { View, StyleSheet, TextInput, Pressable, Text, FlatList } from "react-native";
import ExerciseBlock from "./ExerciseBlock";
import { useQuery } from "../../db/realm";
import ExerciseBlockIcons from "./ExerciseBlockIcons";
import ExerciseColumnHolder from "./ExerciseColumnHolder";
import { useDatabase } from "../../../DatabaseContext";
import ChoiceAnswer from "./ChoiceAnswer";
import { useMaxId } from "../../hooks/useMaxId";


export default function CreatExercise({ saveUserInput, setAddNewExercise }) {
    const { categories, presetsHistory, workoutTemplate } = useDatabase();
    const workoutTemplateData = useQuery(workoutTemplate);
    const { id: nexId } = useMaxId(presetsHistory);
    const [newExercise, setNewExercise] = useState({ id: nexId, exercise: {} })
    const defaultValue = { color: '', value: 0 };
    const exercisesName = useRef('');
    const [chooseCategory, setChooseCategory] = useState(null);
    const currentWorkoutTemplateName = workoutTemplateData.map(exercise => exercise.exercise.fullName.toLowerCase().trim().replace(/\s+/g, ''))
    const [choise, setChoise] = useState(false)


    const selectCategory = (categoryName) => {
        setChooseCategory(categoryName)
    }

    const checkName = (newName) => {
        //console.log(workoutTemplateData)

        const fixedName = newName.toLowerCase().trim().replace(/\s+/g, '')
        if (currentWorkoutTemplateName.includes(fixedName)) {
            alert("All ready exist!")
            return false
        }
        //console.log('NEW NAME : ', newName)
        return true;

    }

    const onCreating = () => {
        if (!exercisesName.current || chooseCategory === null) {
            alert('need name && category')
            return;
        }
        //console.log("exercisesName.current: ", exercisesName.current)
        const answer = checkName(exercisesName.current);
        if (answer && chooseCategory !== null) {
            const newExerciseItem = {
                category: chooseCategory,
                fullName: exercisesName.current,
                reps1: defaultValue, rest1: defaultValue,
                reps2: defaultValue, rest2: defaultValue
            }
            setNewExercise(prev => ({
                ...prev,
                exercise: {
                    ...prev.exercise,
                    ...newExerciseItem
                }
            }))
            //console.log("Created ")
            setChoise(!choise)

        }
    }

    const onSave = () => {
        //table, exercises, id
        const { id, exercise } = newExercise;
        //console.log("Ext ", newExercise)
        saveUserInput(workoutTemplate, exercise, id)
        setAddNewExercise(false)
    }

    return (
        <View style={styles.exerciseMainBody}>
            <View style={styles.exerciseBody}>
                <ExerciseBlockIcons
                    categories={categories}
                    specialFunction={selectCategory}
                    selectedCategory={chooseCategory}
                />

                <TextInput
                    multiline={true}
                    style={styles.inputStyle}
                    placeholder="full name"
                    onChangeText={(text) => {
                        exercisesName.current = text;
                    }}
                />

                <View style={{
                    // borderColor: 'red',
                    // borderWidth: 1,
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {choise ?
                        <ChoiceAnswer
                            onCansel={() => setChoise(!choise)}
                            onSave={onSave}
                            greenButtonText={"Create"}
                        />
                        :
                        <Pressable
                            style={styles.pressableCell}
                            onPress={onCreating}
                        >
                            <Text style={{
                                fontWeight: '600',
                                fontSize: 15,
                                color: 'white'
                            }}>Creat</Text>
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody: {
        //borderColor: 'red',
        borderWidth: 0.1, //0.1
        borderRadius: 5,
        height: "77%",
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    exerciseBody: {
        // borderColor: 'green',
        // borderWidth: 1,
        borderRadius: 5,
        height: "98%",
        width: "98%",
        margin: 5,
        backgroundColor: '#3D458F',
        padding: 5
    },
    inputStyle: {
        // borderColor: 'yellow',
        // borderWidth: 1,
        borderColor: '#2E346E',
        borderWidth: 2,
        height: '5%',
        fontSize: 14,
        paddingBottom: 5,
        textAlign: 'center',
        fontWeight: '600',

    },
    pressableCell: {
        borderColor: '#2E346E',
        borderWidth: 2,
        borderRadius: 5,
        height: '40',
        width: '80',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
});