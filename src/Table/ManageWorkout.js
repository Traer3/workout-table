
import { Pressable, View, StyleSheet } from "react-native";
import { useState } from "react";
import DateForm from "./ManagerFolder/DateForm";
import PresetForm from "./ManagerFolder/PresetForm";
import ExerciseButtons from "./ManagerFolder/ExerciseButtons";
import ExerciseBlock from "./ManagerFolder/ExerciseBlock";
import ExerciseMain from "./ManagerFolder/ExerciseMain";


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