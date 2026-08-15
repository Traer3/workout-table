import { View, Pressable, Text } from "react-native";
import styles from '../RenderItem/renderItemStyles.js'
import { useState } from "react";

export default function WeightNamesBlock({ currentDayData }) {
    const [showName, setShowName] = useState(false);

    return (
        <View style={[styles.rowName, {}]}>
            {currentDayData.map((element) => {
                return (
                    <Pressable
                        key={Math.random()}
                        style={[styles.pressableCell, { overflow: 'visible' }]}
                        //onPressIn={() => { setShowName(!showName) }}
                    >
                        <Text key={element} style={[styles.cell, styles.textStyle, {}]}>{element.fullName}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
    
}