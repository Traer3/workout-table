import { Pressable, TextInput, View, } from "react-native";
import styles from './renderItemStyles.js'
import { useObject, useRealm } from "../../db/realm.js";
import { useState } from "react";

export default function DateBlock({ item,currentDayData, changeWeight, setChangeWeight}) {
    const [data, setData] = useState(item || 'no data')
    const realm = useRealm();

    if(!currentDayData || !currentDayData.isValid()){
        return null;
    }

    function changeDay(oldDayObject, newDateValue) {
        if(!oldDayObject || !oldDayObject.isValid() || oldDayObject.day === newDateValue) return;

        const oldDayKey = oldDayObject.day

        const plainObj = oldDayObject.toJSON()

        realm.write(()=>{
            realm.create('WorkoutDay',{
                ...plainObj,
                day: newDateValue,
            },'modified');
        })

        setTimeout(()=>{
            const dayToDelete = realm.objectForPrimaryKey('WorkoutDay',oldDayKey)
            realm.write(()=>{
                if(oldDayKey && dayToDelete.isValid()){
                    realm.delete(dayToDelete);
                    console.log("Old day deleted!");
                }
            })
        },300);
    }

    return (
        <Pressable
            style={{
                margin: '-10',
                //borderColor: 'red',
                //borderWidth: 1
                //backgroundColor:'red',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={() => {
                console.log("setChangeWeight(!changeWeight)")
                //setChangeWeight(!changeWeight) 
            }}
        >
            <Pressable
                style={{
                    width: "40%",
                }}
            >
                <TextInput
                    style={[styles.textStyle]}
                    value={data}
                    onChangeText={(text) => setData(text)}
                    onSubmitEditing={() => { changeDay(currentDayData, data) }}
                    //onEndEditing={() => { saveToPhone() }}
                />
                    
                
            </Pressable>

        </Pressable>
    )
} 