import { Pressable, TextInput, View, Text } from "react-native";
import styles from './renderItemStyles.js'
import {useRealm } from "../../db/realm.js";
import { useRef } from "react";

export default function DateBlock({ item, currentDayData, loading, setLoading }) {
    const currentDate = new Date(currentDayData["timestamp"] * 1000);
    const date = currentDate ? currentDate.toLocaleDateString('ru-RU',{
        day:'2-digit',
        month:'2-digit',
        year:'2-digit'
    }) : currentDate
    
    const data = useRef(date ||'no data')
    const realm = useRealm();
    //console.log("DateBlock AWAKE!: ", item)

    if (!currentDayData || !currentDayData.isValid()) {
        return null;
    }

    
    function changeDay(oldDayObject, newDateValue) {
        /*
        я получаю дату в стринговом формате 
        мне нужно получить некий "02.06.26" и перевести его timestamp
        
        Убрать возможность менять дату у юзера и сделать автоматом 
        Если даун создал трешу и решил забить хуй 
        то когда он нажимает на кнопку , сразу включается дата в моменте 
        */
       console.log("Pressed!")
       
       /*
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
        */
    }
    return (
        <Pressable
            style={{
                margin: '-10',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={() => {
                setLoading(!loading)
                //console.log("loading: ", loading)
            }}
        >
            <Pressable
                style={{
                    width: "40%",
                }}
                onPressIn={()=> changeDay()}
                >
                <Text style={[styles.textStyle, {marginTop:10}]}>
                    {data.current}
                </Text>
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