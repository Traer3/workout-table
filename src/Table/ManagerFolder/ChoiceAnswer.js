import { Pressable, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useDatabase } from "../../../DatabaseContext";
import { useRealm } from "../../db/realm";
import { useMaxId } from "../../hooks/useMaxId";

export default function ChoiceAnswer({ onSave , onCansel,}) {
    const [active, setActive] = useState(false)

    // const saveNewPreset = () => {
    //     if (exercises && exercises.length > 0) {
    //         console.log("exercises: ", exercises)
    //         console.log("id: ", id)
    //         // realm.write(() => {
    //         //     realm.create(presetsHistory, {
    //         //         id: id,
    //         //         timestamp: currentDate,
    //         //         exercise: exercises
    //         //     }, 'modified')
    //         // });
    //         // return;
    //     }
    // }

    const onPressIn = () => {
        setActive(true)
        onSave()
    }

    const onClose = () => {
        onCansel()
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
                onPressIn={onClose}
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
        // borderColor: 'red',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exerciseHeader: {
        //borderWidth:1,
        //borderColor:'blue',
        borderRadius: 5,
        //height: "50%",
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontWeight: '600',
        fontSize: 20,
    }
});