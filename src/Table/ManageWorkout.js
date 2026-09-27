
import { Pressable, View, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import DateForm from "./ManagerFolder/DateForm";
import ExerciseMain from "./ManagerFolder/ExerciseMain";
import { useQuery, useRealm } from "../db/realm";
import { useDatabase } from "../../DatabaseContext";
import PresetMain from "./ManagerFolder/PresetMain";


export default function ManageWorkout({ editDay, setEditDay }) {
    const realm = useRealm()
    const { presetsHistory, workoutTemplate, getCurrentDate } = useDatabase()
    const [selectedExercises, setSelectedExercises] = useState(new Set())
    const currentDate = getCurrentDate()
    const presetsHistoryData = useQuery(presetsHistory)
    const [curretnPreset, setCurretnPreset] = useState(null)

    useEffect(() => {
        if (!curretnPreset) {
            // console.log("current preset is empty ")
            setCurretnPreset(presetsHistoryData[0])
        }
    }, [curretnPreset])


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
                exercises: exercises
            }, 'modified')
        });
    };

    const saveUserInput = (table, exercises, id, name) => {
        if (exercises && exercises.length > 0) {
            realm.write(() => {
                if (name) {
                    realm.create(table, {
                        id: id,
                        name: name,
                        timestamp: currentDate,
                        exercises: exercises
                    }, 'modified');
                }
                realm.create(table, {
                    id: id,
                    timestamp: currentDate,
                    exercises: exercises
                }, 'modified');
            })
        }
    };

    return (
        <View style={styles.main}>
            <Pressable
                style={styles.outward}
                onPressIn={() => setEditDay(!editDay)}
            >
            </Pressable>
            <View style={styles.mainBody}>
                <DateForm
                    zeroIdSave={zeroIdSave}
                />
                <PresetMain
                    editDay={editDay}
                    setEditDay={setEditDay}
                    setCurretnPreset={setCurretnPreset}
                    selectedExercises={selectedExercises}
                    assembleExercises={assembleExercises}
                    saveUserInput={saveUserInput}
                    zeroIdSave={zeroIdSave}
                    curretnPreset={curretnPreset}
                />
                <ExerciseMain
                    setSelectedExercises={setSelectedExercises}
                    selectedExercises={selectedExercises}
                    colectAllExercises={colectAllExercises}
                    assembleExercises={assembleExercises}
                    zeroIdSave={zeroIdSave}
                    saveUserInput={saveUserInput}
                    curretnPreset={curretnPreset}
                    setCurretnPreset={setCurretnPreset}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        //borderColor: 'red',
        //borderWidth: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    outward: {
        //borderColor:'yellow',
        //borderWidth:1,
        //backgroundColor:'yellow',
        height: '100%',
        width: '100%',

    },
    mainBody: {
        position: 'absolute',
        borderColor: 'green',
        borderWidth: 1,
        height: '93%',
        width: '90%',

    },
});