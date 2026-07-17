import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import ColorPanel from "./ColorPanel";
import { useState } from "react";
import { useRealm } from "../../db/realm.js";


export default function InfoBlock({ currentDayData, dayData, editingCell, setEditingCell, index, flatListRef, mode, }) {
    const realm = useRealm();
    const fullDay = dayData.fullDay
    const exerciseKeys = dayData.exerciseKeys

    const [textData, setTextData] = useState("");

    if(!currentDayData || !currentDayData.isValid()){
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

    const updateValue = (exKey, fieldKey, text) => {
        //console.log("exKey: ", exKey)
        //console.log("fieldKey: ", fieldKey)
        //console.log("text: ", text)
        if (!currentDayData) return;
        realm.write(() => {
            if (currentDayData[exKey] && currentDayData[exKey][fieldKey]) {
                currentDayData[exKey][fieldKey].value = Number(text) || 0;
            }
        })
        setEditingCell(null);
    }
    return (
        <View style={{ flex: 3, flexDirection: 'column', zIndex: 1 }}>
            {fullDay.map((element) => {
                const name = Object.keys(element)[0]
                if (!name) return null;
                const isRowEditing = editingCell && editingCell.startsWith(name);
                const type = mode ? 'exec' : 'weight'
                const rowKey = `row-${index}-${name}-${type}`
                return (
                    <View key={rowKey} style={[styles.row, { zIndex: isRowEditing ? 100 : 1 }]}>
                        {exerciseKeys.map((field) => {
                            const cellId = `${name}-${field}`;
                            const isThisCellEditing = editingCell === cellId;
                            const cellKey = `cell-${index}-${type}-${name}-${field}`
                            const currentValue = typeof element[name][field] === 'object'
                                ? element[name][field]?.value
                                : element[name][field];
                            return (
                                <Pressable
                                    key={cellKey}
                                    style={[styles.pressableCell, { overflow: 'visible' }]}
                                    onPress={() => toogleEditingCell(cellId, currentValue)}>
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
                                                    onSubmitEditing={() => { updateValue(name, field, textData) }}
                                                //onEndEditing={() => { saveToPhone(data) }}
                                                />
                                                <ColorPanel currentDayData={currentDayData} name={name} field={field} />
                                            </View>
                                        ) : (
                                            <Text style={[
                                                styles.textStyle,
                                                styles.cell,
                                                { color: element[name][field]?.color || TextColor }
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