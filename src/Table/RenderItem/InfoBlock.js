import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import ColorPanel from "./ColorPanel";
import { useState } from "react";
import { useObject, useRealm } from "../../db/realm.js";
import { useDatabase } from "../../../DatabaseContext.js";


export default function InfoBlock({ currentDayData, dayData, editingCell, setEditingCell, index, flatListRef, mode, maxId }) {
    const { getFormattedDate, checkHours } = useDatabase();
    const realm = useRealm();
    //console.log("InfoBlock AWAKE!: ",currentDayData["day"])
    const fullDay = dayData.fullDay
    const exerciseKeys = dayData.exerciseKeys

    const [textData, setTextData] = useState("");

    if (!currentDayData || !currentDayData.isValid()) {
        return null;
    }


    const toogleEditingCell = (cellId, initialValue) => {
        console.log("cellId: ", cellId)
        console.log("currentValue: ", initialValue)
        setEditingCell(cellId);
        setTextData(String(initialValue ?? ""))
        flatListRef.current?.scrollToIndex({
            index: index,
            animated: true,
            viewPosition: 0,
        })
    }

    const updateValue = (exKey, fieldKey, text, element) => {
            //console.log("exKey: ", exKey)
            //console.log("fieldKey: ", fieldKey)
            //console.log("text: ", text)
        if (!currentDayData) return;
        const currentDate = getFormattedDate();
        
        if (mode === "weight") {
            const id = element[exKey]["id"]



            const currentDayData = useObject('ExerciseWeightHistory', `${id}`);




            console.log("currentDayData: ",currentDayData)
            
            const timestamp = element[exKey]["timestamp"]
            const checkTime = checkHours(24, timestamp);
            const value = Number(text)
            const fullName = element[exKey]["fullName"]
            const nextId = maxId ? maxId + 1 : 1;

            realm.write(() => {
                if(!checkTime){
                    //console.log("value: ",currentDayData)
                    /*
                    if (currentDayData[exKey] && currentDayData[exKey][fieldKey]) {
                        currentDayData[exKey][fieldKey].value = Number(text) || 0;
                    }
                    */
                    /*
                    realm.create('ExerciseWeightHistory', {
                        id: id,
                        day: currentDate,
                        fullName: fullName,
                        timestamp: Math.floor(Date.now() / 1000),
                        weightData: { color: '', value: value }
                    }, 'modified')
                    */
                }else{
                    realm.create('ExerciseWeightHistory', {
                        id: nextId,
                        day: currentDate,
                        fullName: fullName,
                        timestamp: Math.floor(Date.now() / 1000),
                        weightData: { color: '', value: value }
                    })
                }
            })
            setEditingCell(null);
            return;
        }

        realm.write(() => {
            console.log("Mode exec!")
            console.log("ex: ",currentDayData)
            if (currentDayData[exKey] && currentDayData[exKey][fieldKey]) {
                currentDayData[exKey][fieldKey].value = Number(text) || 0;
            }
        })
        setEditingCell(null);
        return;
    }
    return (
        <View style={{ flex: 3, flexDirection: 'column', zIndex: 1 }}>
            {fullDay.map((element) => {
                const name = Object.keys(element)[0]
                if (!name) return null;
                //console.log("name: ",name)
                const isRowEditing = editingCell && editingCell.startsWith(name);
                //console.log("isRowEditing: ", isRowEditing)
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
                                                    onSubmitEditing={() => { updateValue(name, field, textData, element) }}
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