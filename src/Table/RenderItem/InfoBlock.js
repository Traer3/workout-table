import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import ColorPanel from "./ColorPanel";
import { useState } from "react";
import { useObject, useRealm } from "../../db/realm.js";
import { useDatabase } from "../../../DatabaseContext.js";


export default function InfoBlock({ currentDayData, dayData, editingCell, setEditingCell, index, flatListRef, mode, maxId, elementIndex }) {
    
    
    const [id, setId] = useState(-1);
    const currentWeightDayData = useObject('ExerciseWeightHistory', id)

    const { getFormattedDate, checkHours } = useDatabase();
    const realm = useRealm();
    const [textData, setTextData] = useState("");
    //const fullDay = dayData.fullDay
    //const exerciseData = currentDayData.exercises
    //const exerciseKeys = exerciseData.map(element => Object.keys(element))
    //console.log("exerciseKeys: ", exerciseKeys) ;


    //console.log("currentDayData: ", currentDayData)    

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

    const updateValue = (exKey, fieldKey, text, element) => {
        if (!currentDayData) return;
        
        if (mode === "weight") {
            const currentDate = getFormattedDate();
            if(currentWeightDayData !== null){
                const timestamp = element[exKey]["timestamp"]
                const checkTime = checkHours(24, timestamp);
                const value = Number(text)
                const fullName = element[exKey]["fullName"]
                const nextId = maxId ? maxId + 1 : 1;

                realm.write(() => {
                    if(!checkTime){
                        if(currentWeightDayData["fullName"] === fullName &&  currentWeightDayData[fieldKey]){
                            currentWeightDayData[fieldKey].value = value || 0;
                            console.log("Data updated! ")
                        }
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
                
            }
            setEditingCell(null);
            return;
        }

        realm.write(() => {
            if (currentDayData[exKey] && currentDayData[exKey][fieldKey]) {
                currentDayData[exKey][fieldKey].value = Number(text) || 0;
            }
        })
        setEditingCell(null);
        return;
    }

    /*
    {
        "exerciseKey": "RWC", 
        "fullName": "Reverse Wrist Curl", 
        "reps1": [Object], 
        "reps2": [Object], 
        "rest1": [Object], 
        "rest2": [Object]
      }, 
    */
    return (
        <View style={{ flex: 3, flexDirection: 'column', zIndex: 1 }}>
            {currentDayData.exercises.map((element) => { 
                
                console.log("elementIndex: ", elementIndex)
                const name = element.exerciseKey
                const uselessKeys = ["exerciseKey", "fullName"]
                const exerciseKeys = Object.keys(element).filter(key => !uselessKeys.includes(key))
                if (!name) return null;

                const isRowEditing = editingCell && editingCell.startsWith(name);
                const type = mode ?  'weight' : 'exec' 
                const rowKey = `row-${index}-${name}-${type}`
                //console.log("mode: ",mode)
                return (
                    <View key={rowKey} style={[styles.row, { zIndex: isRowEditing ? 100 : 1 }]}>
                        {exerciseKeys.map((field) => {
                            console.log("element[name][field]: ", element[field])
                            const cellId = `${name}-${field}`;
                            
                            const isThisCellEditing = editingCell === cellId;
                            const cellKey = `cell-${index}-${type}-${name}-${field}`
                            const currentValue = typeof element[field] === 'object'
                                ? element[field]?.value
                                : element[field];
                            
                            return (
                                <Pressable
                                    key={cellKey}
                                    style={[styles.pressableCell, { overflow: 'visible'}]}
                                    onPress={() => {
                                        /*
                                        if(element[name]["id"]){
                                            setId(element[name]["id"]);
                                        }
                                        */
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
                                                    onSubmitEditing={() => updateValue(name, field, textData, element)}
                                                />
                                                {mode ?
                                                    <ColorPanel currentDayData={currentWeightDayData} name={name} field={field} mode={mode} />
                                                    :
                                                    <ColorPanel currentDayData={currentDayData} name={name} field={field} />
                                                }
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