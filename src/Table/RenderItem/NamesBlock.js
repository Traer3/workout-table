import { View, Pressable, Text } from "react-native";
import styles from './renderItemStyles.js'
import { useState } from "react";

export default function NamesBlock({ currentDayData }) {
    if (!currentDayData.isValid()) return;

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
                        <Text
                            key={element}
                            style={[styles.cell, styles.textStyle, {}]}
                        >
                            { showName ? element.fullName : element.fullName // заменяем exerciseKey на fullName , меня заебали эти ключи
                            }
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )

}