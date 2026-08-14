import { View, Pressable, Text } from "react-native";
import styles from '../RenderItem/renderItemStyles.js'
import { useState } from "react";

export default function WeightNamesBlock({ currentDayData }) {
    if(!currentDayData.isValid()) return;

    //const currentWeightDayData = useObject('ExerciseWeightHistory', id)
    const [showName, setShowName] = useState(false);
    const dayData = currentDayData.exercises;
    
    return (
        <View style={[styles.rowName, {}]}>
            {dayData.map((element) => {
                return (
                    <Pressable
                        key={Math.random()}
                        style={[styles.pressableCell, { overflow: 'visible' }]}
                        onPressIn={() => { setShowName(!showName) }}
                    >
                        <Text key={element} style={[styles.cell, styles.textStyle, {}]}>{showName ? element.fullName : element.exerciseKey}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
    
}