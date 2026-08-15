import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor } from '../RenderItem/renderItemStyles.js'

import ColorPanel from "../RenderItem/ColorPanel.js";
import { useState } from "react";
import { useObject, useRealm } from "../../db/realm.js";
import { useDatabase } from "../../../DatabaseContext.js"


export default function WeightInfoBlock({ currentDayData, editingCell, setEditingCell, index, flatListRef, maxId }) {
    let i = 0;
    const [id, setId] = useState(-1);
    const currentWeightDayData = useObject('ExerciseWeightHistory', id)

    const { getFormattedDate, checkHours } = useDatabase();
    const realm = useRealm();
    const [textData, setTextData] = useState("");

    if (!currentDayData) {
        return null;
    }

    const toogleEditingCell = (cellId, initialValue) => {
        setEditingCell(cellId);
        setTextData(String(initialValue ?? ""))
        flatListRef.current?.scrollToIndex({
            index: index,
            animated: true,
            viewPosition: 0,
        })
    }

    const updateValue = (text) => {
        if (!currentDayData) return;
        const currentDate = getFormattedDate();
        if (currentWeightDayData !== null) {
            console.log("currentWeightDayData: ", currentWeightDayData)
            const timestamp = currentWeightDayData.timestamp
            const checkTime = checkHours(24, timestamp);
            const value = Number(text)
            const fullName = currentWeightDayData.fullName
            const nextId = maxId ? maxId + 1 : 1;

            realm.write(() => {
                if (!checkTime) {
                    if (currentWeightDayData.fullName === fullName && currentWeightDayData["weightData"]) {
                        currentWeightDayData["weightData"].value = value || 0;
                        console.log("Data updated! ")
                    }
                } else {
                    realm.create('ExerciseWeightHistory', {
                        id: nextId,
                        day: currentDate,
                        fullName: fullName,
                        timestamp: Math.floor(Date.now() / 1000),
                        weightData: { color: '', value: value }
                    })
                }
            })
        }
        setEditingCell(null);
        return;
    }

    return (
        <View style={{ flex: 3, flexDirection: 'column', zIndex: 1 }}>
            {currentDayData.map((element) => {
                if (typeof element === 'object') { i++ }
                const name = element.fullName
                const field = "weightData";

                if (!name) return null;
                const isRowEditing = editingCell && editingCell.startsWith(name);
                const type = 'weight'
                const rowKey = `row-${index}-${name}-${type}`

                const cellId = `${name}-${field}`;
                const isThisCellEditing = editingCell === cellId;
                const cellKey = `cell-${index}-${type}-${name}-${field}`

                const currentValue = typeof element[field] === 'object'
                    ? element[field]?.value
                    : element[field];

                return (
                    <View key={rowKey} style={[styles.row, { zIndex: isRowEditing ? 100 : 1 }]}>
                        <Pressable
                            key={cellKey}
                            style={[styles.pressableCell, { overflow: 'visible' }]}
                            onPress={() => {
                                if (element.id) {
                                    setId(element.id);
                                }
                                toogleEditingCell(cellId, currentValue)
                            }}>
                            {
                                isThisCellEditing ? (
                                    <View style={{ flex: 1, overflow: 'visible', zIndex: 120 }}>
                                        <TextInput
                                            style={[styles.cell, styles.input, styles.textStyle, {}]}
                                            keyboardType="numeric"
                                            autoFocus={true}
                                            value={textData}
                                            onChangeText={(text) => { setTextData(text) }}
                                            onBlur={() => setEditingCell(null)}
                                            onSubmitEditing={() => updateValue(textData)}
                                        />
                                        <ColorPanel currentDayData={currentWeightDayData} name={name} field={field} mode={type} />
                                    </View>
                                ) : (
                                    <Text style={[
                                        styles.textStyle,
                                        styles.cell,
                                        { color: element[field]?.color || TextColor }
                                    ]}>
                                        {currentValue}
                                    </Text>
                                )
                            }
                        </Pressable>
                    </View>
                )
            })}
        </View>
    )
}