
import { Pressable, View, StyleSheet } from "react-native";
import { useState } from "react";
import DateForm from "./ManagerFolder/DateForm";
import PresetForm from "./ManagerFolder/PresetForm";
import ExerciseButtons from "./ManagerFolder/ExerciseButtons";
import ExerciseBlock from "./ManagerFolder/ExerciseBlock";
import ExerciseMain from "./ManagerFolder/ExerciseMain";


/*
 realm.create('WorkoutDay', {
                day: '30.05.26',
                PU: { fullName: 'Push Ups', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                RWC: { fullName: 'Reverse Wrist Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WC: { fullName: 'Wrist Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WSC: { fullName: 'Wrist Side Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WP: { fullName: 'Wrist Pronation', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WS: { fullName: 'Wrist Suplination', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
            });
*/



export default function ManageWorkout({ editDay, setEditDay }) {
    const [presetState, setPresetState] = useState(true)
    const [newDay, setNewDay] = useState({});

    console.log("newDay: ", newDay)
    return (
        <View style={styles.main}>
            <Pressable
                style={styles.outward}
                onPressIn={() => setEditDay(!editDay)}
            >
                <View style={styles.mainBody}>
                    {/*Отдельная форма даты*/}
                    <DateForm newDay={newDay} setNewDay={setNewDay}/>

                    {/*Отдельная форма пресетов*/}
                    <PresetForm  presetState={presetState} />

                    {/*Отдельная форма кнопок треши*/}
                    <ExerciseMain newDay={newDay} setNewDay={setNewDay}/>
                    
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        borderColor: 'red',
        borderWidth: 1,
        height: '100%',

    },
    outward: {
        //borderColor:'yellow',
        //borderWidth:1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBody: {
        borderColor: 'green',
        borderWidth: 1,
        height: '93%',
        width: '90%'
    },
});