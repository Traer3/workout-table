import { Pressable, TextInput, } from "react-native";
import styles from './renderItemStyles.js'
import { useObject, useRealm } from "../../db/realm.js";
import { useState } from "react";


export default function DateBlock({ item, changeWeight, setChangeWeight, toogleSave, saveToPhone, }) {
    const [data, setData] = useState(item || 'no data')
    const realm = useRealm();
    const currentDay = useObject('WorkoutDay', `${item}`);

    function changeDay(currentDay, day, value) {
        console.log("day: ",day)
        console.log("value: ",value)
        realm.write(() => {
            currentDay[day] = value //бля
            console.log("Data change!")
        });
        
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
                    onChangeText={(text) => {
                        setData(text)
                    }
                    }
                    onSubmitEditing={() => { changeDay(currentDay, item, data) }}
                    //onEndEditing={() => { saveToPhone() }}
                >
                    {data}
                </TextInput>
            </Pressable>

        </Pressable>
    )
} 