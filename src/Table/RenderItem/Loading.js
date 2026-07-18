import { ImageBackground, View } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'

import serverGif from '../../../assets/server.gif'
import NamesBlock from "./NamesBlock.js";
import { Text } from "react-native";
import DateBlock from "./DateBlock.js";

export default function Loading({ dayData, mode = true, index }) {
    const fullDay = dayData.fullDay
    const exerciseKeys = dayData.exerciseKeys

    return (
        <View >
            <ImageBackground source={serverGif}>
                <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
                    <DateBlock />
                </View>
                <View style={[styles.table, { backgroundColor: 'rgba(0,0,0,0)' }]}>
                    <NamesBlock values={dayData} />
                    <View style={{ flex: 3, flexDirection: 'column', zIndex: 1 }}>
                        {fullDay.map((element) => {
                            const name = Object.keys(element)[0]
                            if (!name) return null;
                            const type = mode ? 'exec' : 'weight'
                            const rowKey = `row-${index}-${name}-${type}`
                            return (
                                <View key={rowKey} style={[styles.row]}>
                                    {exerciseKeys.map((field) => {
                                        const currentValue = typeof element[name][field] === 'object'
                                            ? element[name][field]?.value
                                            : element[name][field];
                                        return (
                                            <Text
                                                key={field}
                                                style={[
                                                    styles.textStyle,
                                                    styles.cell,
                                                    { color: element[name][field]?.color || TextColor }
                                                ]}>
                                                {currentValue}
                                            </Text>
                                        )
                                    })}
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

