import { Pressable, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useDatabase } from "../../../DatabaseContext";
import { useQuery, useRealm } from "../../db/realm";

export default function ChoiceAnswer({ setActiveCategory, selectedExercises, assembleExercises }) {
    const [active, setActive] = useState(false)
    const {presetsHistory, workoutTemplate} = useDatabase();
    const presetsHistoryData = useQuery(presetsHistory)
    const workoutTemplateData = useQuery(workoutTemplate)
    //console.log("workoutTemplate: ", workoutTemplate)
    const realm = useRealm();

    /*
    {
                    category:'string?',
                    fullName: 'Lying Barbell Triceps Extension',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    category:'string?',
                    fullName: 'Reverse Wrist Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    category:'string?',
                    fullName: 'Wrist Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    category:'string?',
                    fullName: 'Wrist Side Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    category:'string?',
                    fullName: 'Wrist Pronation',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    category:'string?',
                    fullName: 'Wrist Suplination',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
    */

    /*
     realm.write(() => {
            const currentDate = Math.floor(Date.now() / 1000) 
            realm.create('PresetsHistory', {
                id:0,
                timestamp: currentDate,
                exercises:[

                ]
            }, 'modified');
    */

    
    const onPressIn = () => {
        /*
        const element = realm.objectForPrimaryKey("PresetsHistory",1)
        realm.write(()=>{
            realm.delete(element);
        })
        */
        setActive(true)
        //assembleExercises(selectedExercises);
        return
    
    }

    const onPressOut = () => {
        setTimeout(() => {
            setActive(false)
        }, 200)
    }
    return (
        <View style={styles.mainBody}>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: 'transparent', }]}
                onPressIn={() => setActiveCategory(null)}
            >
                <Text style={[styles.buttonText, { color: 'red' }]}> Cansel</Text>
            </Pressable>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: active ? 'rgba(76, 175, 80, 0.2)' : 'transparent', }]}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Text style={[styles.buttonText, { color: 'green' }]}>Start</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exerciseHeader: {
        //borderWidth:1,
        //borderColor:'blue',
        borderRadius: 5,
        height: "100%",
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontWeight: '600',
        fontSize: 25,
    }
});