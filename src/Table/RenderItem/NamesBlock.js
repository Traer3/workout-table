import { View, Pressable, Text } from "react-native";
import styles from './renderItemStyles.js'
import { useState } from "react";


export default function NamesBlock({ values }) {
    const [showName, setShowName] = useState(false);
    const dayData = values.fullDay;
    
    return (
        <View style={[styles.rowName, {}]}>
            {dayData.map((element) => {
                const name = Object.keys(element);
                const fullName = element[name]["fullName"]
                return (
                    <Pressable
                        key={Math.random()}
                        style={[styles.pressableCell, { overflow: 'visible' }]}
                        onPressIn={() => { setShowName(!showName) }}
                    >
                        <Text key={element} style={[styles.cell, styles.textStyle, {}]}>{showName ? fullName : name}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
    
}