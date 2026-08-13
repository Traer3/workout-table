import { Pressable, Text, View } from "react-native";
import styles from './renderItemStyles.js'
import {useRealm } from "../../db/realm.js";
import { useState } from "react";
import { useDatabase } from "../../../DatabaseContext.js";

export default function DateBlock({currentDayData, setLoading, loading}) {
    const {getFormattedDate} = useDatabase()
    const realm = useRealm();
    const [date, setDate] = useState(()=> getFormattedDate(currentDayData.timestamp)) 
    
    if (!currentDayData || !currentDayData.isValid()) return null;

    function changeDay() {
       const todayString = getFormattedDate();
       const currentTimestamp = Math.floor(Date.now() / 1000)
       if(date !== todayString) {
            realm.write(()=>{
                if(currentDayData.timestamp && currentTimestamp){
                    currentDayData.timestamp = currentTimestamp || 0;
                }
            })
            setDate(currentTimestamp)
       }
       return;
    }
    return (
        <Pressable
            style={{
                //margin: '-10',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPressIn={()=>{setLoading(!loading)}}
            >
            <Pressable 
                style={{ width: "40%", }}
                onPressIn={()=> changeDay()}
                >
                <Text style={[styles.textStyle, //{marginTop:10}
                ]}>{date}</Text>
            </Pressable>
        </Pressable>
    )
} 

//Записать эту дрочь , как я менял primaryKey
/*
 function changeDay(oldDayObject, newDateValue) {
        if (!oldDayObject || !oldDayObject.isValid() || oldDayObject.day === newDateValue) return;

        const oldDayKey = oldDayObject.day
        const plainObj = oldDayObject.toJSON()

        setLoading(true);

        setTimeout(() => {
            realm.write(() => {
                realm.create('WorkoutDay', {
                    ...plainObj,
                    day: newDateValue,
                }, 'modified');

                const dayToDelete = realm.objectForPrimaryKey('WorkoutDay', oldDayKey)

                if (oldDayKey && dayToDelete.isValid()) {
                    realm.delete(dayToDelete);
                    //console.log("Old day deleted!");
                }

                setTimeout(() => {
                    setLoading(false);
                    //console.log("Table loaded with new data")
                }, 50)
            })
        }, 100)
    }
*/