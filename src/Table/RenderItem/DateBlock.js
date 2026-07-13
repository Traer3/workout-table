import { Pressable, TextInput, } from "react-native";
import styles from './renderItemStyles.js'
import { useObject, useRealm } from "../../db/realm.js";
import { useState } from "react";

// После того как отобразишь все объекты в таблице , проверь как меняется дата , если значение не AA.BB.XX , а например AA.BB.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//У меня была ошибка 
export default function DateBlock({ item,currentDayData, changeWeight, setChangeWeight}) {
    const [data, setData] = useState(item || 'no data')
    const realm = useRealm();

    function changeDay(oldDayObject, newDateValue) {
        if(!oldDayObject || oldDayObject.day === newDateValue) return;
        const plainObj = oldDayObject.toJSON()
        realm.write(()=>{
            realm.create('WorkoutDay',{
                ...plainObj,
                day: newDateValue,
            },'modified');
            realm.delete(oldDayObject)
        })
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