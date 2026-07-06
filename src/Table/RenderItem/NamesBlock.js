import { View, Pressable, Text } from "react-native";
import styles from './renderItemStyles.js'
import { useState } from "react";


export default function NamesBlock({exerciseNames, values}) {
      const [showName, setShowName] = useState(false);
    return (
        <View style={[styles.rowName, {}]}>
            {exerciseNames.map((name) => {
                const fullName = values[name].fullName
                return (
                    <Pressable
                        key={Math.random()}
                        style={[styles.pressableCell, { overflow: 'visible' }]}
                        onPressIn={() => { setShowName(!showName) }}
                    >
                        <Text key={name} style={[styles.cell, styles.textStyle, {}]}>{showName ? fullName : name}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}