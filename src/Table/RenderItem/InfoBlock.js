import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import ColorPanel from "./ColorPanel";
import { useState } from "react";
import { useRealm } from "../../db/realm.js";

export default function InfoBlock({ currentDayData, editingCell, setEditingCell, index, flatListRef, }) {
    let i = 0;
    const realm = useRealm();
    const [textData, setTextData] = useState("");

    if (!currentDayData || !currentDayData.isValid()) {
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

    const updateValue = (fieldKey, text, i) => {
        if (!currentDayData) return;
        realm.write(() => {
            if (currentDayData.exercises[i - 1] && currentDayData.exercises[i - 1][fieldKey]) {
                currentDayData.exercises[i - 1][fieldKey].value = Number(text) || 0;
            }
        })
        setEditingCell(null);
        return;
    }

    return (
        <View style={{ flex: 3, flexDirection: 'column', zIndex: 1 }}>
            {currentDayData.exercises.map((element) => {
                    if (typeof element === 'object') { i++ }
                const name = element.exerciseKey
                const uselessKeys = ["exerciseKey", "fullName"]
                const exerciseKeys = Object.keys(element).filter(key => !uselessKeys.includes(key))
                    if (!name) return null;
                const isRowEditing = editingCell && editingCell.startsWith(name);
                const type = 'exec'
                const rowKey = `row-${index}-${name}-${type}`
                return (
                    <View key={rowKey} style={[styles.row, { zIndex: isRowEditing ? 100 : 1 }]}>
                        {exerciseKeys.map((field) => {
                            const cellId = `${name}-${field}`;
                            const cellIndex = i
                            const isThisCellEditing = editingCell === cellId;
                            const cellKey = `cell-${index}-${type}-${name}-${field}`
                            const currentValue = typeof element[field] === 'object'
                                ? element[field]?.value
                                : element[field];

                            return (
                                <Pressable
                                    key={cellKey}
                                    style={[styles.pressableCell, { overflow: 'visible' }]}
                                    onPress={() => {
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
                                                    onSubmitEditing={() => updateValue(name, field, textData, element, cellIndex)}
                                                />
                                                <ColorPanel currentDayData={currentDayData} name={name} field={field} index={cellIndex} />
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
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
}