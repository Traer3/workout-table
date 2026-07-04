import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import ColorPanel from "./ColorPanel";
import { useState } from "react";
import NamesBlock from "./NamesBlock.js";
import { useTools } from "../../../StyleAssistant.js";


export default function InfoBlock({ 
    exerciseNames, 
    editingCell, 
    setEditingCell, 
    values, 
    setValues, 
    data, 
    setData, 
    index,
    changeWeight, 
    setChangeWeight, 
    saveToPhone, 
    flatListRef, 
    toogleSave, }) {
    const weightsKey = Object.keys(values).filter(key => key === 'weights')
    const [weightsValues, setWeightValues] = useState(values[weightsKey])
    //console.log("weightsValues : ",weightsKey)
    const weightsKyes = Object.keys(weightsValues)
    
    const { backgroundColor } = useTools(); 

    const updateValue = (exName, field, text) => {
        const numericValue = text
        const newValues = {
            ...values,
            [exName]: {
                ...values[exName],
                [field]: typeof values[exName][field] === 'object'
                    ? { ...values[exName][field], value: numericValue }
                    : numericValue
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
        <View style={{ flex: 3, flexDirection: 'column', zIndex: 1 }}>
            {changeWeight && 
                <View style={[styles.table, {position:'absolute', zIndex:999, backgroundColor: backgroundColor, borderColor:'red',borderWidth:1}]}>
                    <NamesBlock exerciseNames={exerciseNames} values={values}/>
                    {weightsKyes.map((key)=>{
                        const isRowEditing = editingCell && editingCell.startsWith(key);
                        return(
                            <Pressable
                                key={key}
                                style={[styles.pressableCell, { overflow: 'visible' }]}
                                onPress={() => toogleEditingCell(cellId)}
                            >
                                <View key={key} style={[styles.row, { zIndex: isRowEditing ? 100 : 1 , borderColor:'red',borderWidth:1}]}>
                                    <Text>{weightsValues[key].value}</Text>
                                </View>
                            </Pressable>
                        )
                    })}
                </View>
                
            }
            {exerciseNames.map((name) => {
                const isRowEditing = editingCell && editingCell.startsWith(name);

                return (
                    <View key={name} style={[styles.row, { zIndex: isRowEditing ? 100 : 1 }]}>
                        {['reps1', 'rest1', 'reps2', 'rest2'].map((field) => {
                            const cellId = `${name}-${field}`;
                            const isThisCellEditing = editingCell === cellId;

                            return (
                                <Pressable
                                    key={field}
                                    style={[styles.pressableCell, { overflow: 'visible' }]}
                                    onPress={() => toogleEditingCell(cellId)}>
                                    {
                                        isThisCellEditing ? (
                                            <View style={{ position: 'absolute', height: "100%", width: '100%', overflow: 'visible', zIndex: 120, }}>
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