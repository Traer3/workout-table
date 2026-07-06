import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import ColorPanel from "./ColorPanel";
import { useState } from "react";
import NamesBlock from "./NamesBlock.js";
import { useTools } from "../../../StyleAssistant.js";


export default function InfoBlock({ 
    exerciseNames,
    exerciseKeys,
    values, 
    setValues, 
    data, 
    setData, 
    editingCell, 
    setEditingCell, 
    index,
    saveToPhone, 
    flatListRef,
    mode, 
    toogleSave, 
}) {
    
  
    const updateValue = (exName, field, text) => {
        const numericValue = text
        const newValues = {
            ...values,
            [exName]: {
                ...values[exName],
                [field]:{
                    ...values[exName]?.[field],
                    value: numericValue
                }
            }
        };
        setValues(newValues);

        const newData = [...data];
        newData[index] = newValues;
        setData(newData);
    };
    const toogleEditingCell = (cellId) => {

        setEditingCell(cellId);
        flatListRef.current?.scrollToIndex({
            index: index,
            animated: true,
            viewPosition: 0,
        })
    }
    return (
        <View style={{ flex: 3, flexDirection: 'column', zIndex: 1}}>
            {exerciseNames.map((name) => {
                const isRowEditing = editingCell && editingCell.startsWith(name);
                const type = mode ? 'exec' : 'weight' 
                const rowKey = `row-${index}-${name}-${type}`
                return (
                    <View key={rowKey} style={[styles.row, { zIndex: isRowEditing ? 100 : 1}]}>
                        {exerciseKeys.map((field) => {
                            const cellId = `${name}-${field}`;
                            const isThisCellEditing = editingCell === cellId;
                            const cellKey = `cell-${index}-${type}-${name}-${field}`
                            //console.log("cellKey", cellKey)
                            return (
                                <Pressable
                                    key={cellKey}
                                    style={[styles.pressableCell, { overflow: 'visible' }]}
                                    onPress={() => toogleEditingCell(cellId)}>
                                    {
                                        isThisCellEditing ? (
                                            <View style={{  flex:1, overflow: 'visible', zIndex: 120}}>
                                                <TextInput
                                                    style={[styles.cell, styles.input, styles.textStyle, {}]}
                                                    keyboardType="numeric"
                                                    autoFocus={true}
                                                    value={String(
                                                        typeof values[name][field] === 'object'
                                                            ? values[name][field].value
                                                            : values[name][field]
                                                    )}
                                                    onChangeText={(text) => updateValue(name, field, text)}
                                                    onBlur={() => setEditingCell(null)}
                                                    onSubmitEditing={() => { toogleSave(data) }}
                                                    onEndEditing={() => { saveToPhone(data) }}
                                                />
                                                <ColorPanel index={index} name={name} field={field} setValues={setValues} values={values} setData={setData} data={data} saveToPhone={saveToPhone} />
                                            </View>
                                        ) : (
                                            <Text style={[
                                                styles.textStyle,
                                                styles.cell,
                                                { color: values[name][field]?.color || TextColor }
                                            ]}>
                                                {typeof values[name][field] === 'object'
                                                    ? values[name][field].value
                                                    : values[name][field]
                                                }
                                            </Text>
                                        )}
                                </Pressable>
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
}