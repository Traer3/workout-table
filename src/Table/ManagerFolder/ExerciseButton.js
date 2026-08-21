import { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";


export default function ExerciseButton({specialFunction, specialName}) {
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
                <Text style={{color:'white', fontWeight:'600'}}>{specialName}</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseCell: {
        borderColor: '#2E346E',
        borderWidth: 1,
        borderRadius: 5,
        height:50,
        margin: 5,
        
    },
    exerciseHeader: {
        borderRadius: 5,
        height:"100%",
        width:'100%',
        justifyContent:'center',
        alignItems: 'center',
        
    }
});