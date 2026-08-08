import { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";


export default function ExerciseButton({specialFunction}) {
    const [color, setColor] = useState(false)
    function onPress() {
        setColor(prev => !prev)
        if(!specialFunction) return
        console.log("yes")
        specialFunction()
    }

    return (
        <View style={styles.exerciseCell}>
            <Pressable style={[styles.exerciseHeader, { backgroundColor: color ? 'rgba(76, 175, 80, 0.2)' : 'transparent' }]} onPressIn={() => onPress()}>
                <Text>{'PU'}</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseCell: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    exerciseHeader: {
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        height: '4%',
        width: '90%',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
        
    }
});