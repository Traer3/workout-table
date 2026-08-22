import { useState } from "react";
import { Pressable, View, StyleSheet, Text, Image} from "react-native";
import neck from "../../../assets/ExerciseIcons/neck.png" 
import deltoids from "../../../assets/ExerciseIcons/deltoid.png" 
import chest from "../../../assets/ExerciseIcons/chest.png" 
import back from "../../../assets/ExerciseIcons/back.png" 
import arms from "../../../assets/ExerciseIcons/arms.png" 
import forearms from "../../../assets/ExerciseIcons/forearm.png" 
import core from "../../../assets/ExerciseIcons/abs.png" 
import glutes from "../../../assets/ExerciseIcons/glutes.png" 
import thighs from "../../../assets/ExerciseIcons/thigh.png" 
import calves from "../../../assets/ExerciseIcons/calves.png"
import unique from "../../../assets/ExerciseIcons/unique.png" 

const icons = {
    Neck: neck,
    Deltoids:deltoids,
    Chest:chest,
    Back:back,
    Arms:arms,
    Forearms:forearms,
    Core:core,
    Glutes:glutes,
    Thighs:thighs,
    Calves:calves,
    Unique:unique,

}

export default function ExerciseButton({specialFunction, specialName, iconName}) {
    const [color, setColor] = useState(false)
    function onPress() {
        setColor(prev => !prev)
        if(!specialFunction) return
        console.log("yes")
        specialFunction()
    }

    return (
        <View style={[styles.exerciseCell, {
            height: iconName ? "60%" : "50" , 
            minWidth: iconName ? "60": 0, 
            
            }] }>
            <Pressable style={[styles.exerciseHeader, { backgroundColor: color ? 'rgba(76, 175, 80, 0.2)' : 'transparent' }]} onPressIn={() => onPress()}>
                {iconName ? <Image source={icons[iconName]} style={{ width: 30, height: 30 , }} resizeMode="contain"/>   
                :
                <Text style={{color:'white', fontWeight:'600'}}>{specialName}</Text>
                 
             }
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseCell: {
        borderColor: '#2E346E', //#2E346E
        borderWidth: 1,
        borderRadius: 5,
        margin:5
    },
    exerciseHeader: {
        borderRadius: 5,
        height:"100%",
        width:'100%',
        justifyContent:'center',
        alignItems: 'center',
        
    }
});