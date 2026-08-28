import { memo, useState } from "react";
import { Pressable, View, StyleSheet, Text, Image } from "react-native";
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
    Deltoids: deltoids,
    Chest: chest,
    Back: back,
    Arms: arms,
    Forearms: forearms,
    Core: core,
    Glutes: glutes,
    Thighs: thighs,
    Calves: calves,
    Unique: unique,
}

const ExerciseButton = memo(({ specialFunction, specialName, iconName, colorFunction, activeCategory, selected }) => {
        //console.log("activeCategory: " ,activeCategory, "   ", specialName)
    //let isActive = activeCategory === specialName
    let isActive = [activeCategory].includes(specialName); 

    /*
    //|| selected.includes(specialName);
    console.log("selected: ", selected)
    if(selected && selected.length > 0){
        console.log("working ",)
        isActive = selected.includes(specialName)
        console.log("isActive: ", isActive)
    }
    */
    function onPress() {
        if(colorFunction) colorFunction(specialName)
        if (specialFunction) specialFunction(specialName)
    };

    return (
        <View style={[styles.exerciseCell, {
            height: iconName ? "60%" : "50",
            minWidth: iconName ? "60" : 0,
        }]}>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: isActive ? 'rgba(76, 175, 80, 0.2)' : 'transparent' }]}
                onPress={() => onPress()}
            >
                {iconName ? <Image source={icons[iconName]} style={{ width: 30, height: 30, }} resizeMode="contain" />
                    :
                    <Text style={{ color: 'white', fontWeight: '600' }}>{specialName}</Text>
                }
            </Pressable>
        </View>
    )
})

export default ExerciseButton;

const styles = StyleSheet.create({
    exerciseCell: {
        borderColor: '#2E346E',
        borderWidth: 0.2,
        borderRadius: 5,
        margin: 5
    },
    exerciseHeader: {
        borderRadius: 5,
        height: "100%",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    }
});