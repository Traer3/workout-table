import { View } from "react-native"
import InfoBlock from "./InfoBlock"
import { useDatabase } from "../../../DatabaseContext"
import { useRealm } from "../../db/realm";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import { useState } from "react";
import NamesBlock from "./NamesBlock";



export default function WeightTable ({dayData}) {

    //Я могу получать данные из приходящего дня 
    //Фильтровать пустые строки "BSS": null, "EP": null, "ETK": null, "LR": null, "SCR": null, "SU": null, "Sq": null, 
    //Собрать массив с ключами , полными именнами и трешей 

    // currentDayData:  
    // {"BR": {"fullName": "Barbell Row", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]},
    //  "BSS": null, "EP": null, "ETK": null, "LR": null, 
    // "PU": {"fullName": "Push Ups", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
    // "RWC": {"fullName": "Reverse Wrist Curl", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
    // "SCR": null, "SU": null, "Sq": null, 
    // "WC": {"fullName": "Wrist Curl", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]},
    // "WP": {"fullName": "Wrist Pronation", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
    // "WS": {"fullName": "Wrist Suplination", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
    // "WSC": {"fullName": "Wrist Side Curl", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
    // "day": "29.06.26"}

    //Получаю ключи exerciseKeys ["PU", "WC", "WS"]    //надо получать полные имена 
    //Прохожусь по всему weightHistory и выбираю только самые актуальные значение к эти ключам 
    //собираю эти  [
    // {"day": "09.07.26", "exerciseName": "Wrist Suplination", "id": 0, "timestamp": 1784491176, "weightValue": 7.5},
    // {"day": "10.05.26", "exerciseName": "Wrist Pronation", "id": 1, "timestamp": 1784493003, "weightValue": 10}, 
    // {"day": "11.05.26", "exerciseName": "Wrist Pronation", "id": 2, "timestamp": 1784493646, "weightValue": 1}, 
    // {"day": "15.05.26", "exerciseName": "Wrist Pronation", "id": 3, "timestamp": 1784493669, "weightValue": 15}, 
    // {"day": "15.05.26", "exerciseName": "Wrist Pronation", "id": 4, "timestamp": 1784493685, "weightValue": 20}]
    const {weightHistory} = useDatabase();
      const [editingCell, setEditingCell] = useState(null); 
    //console.log("weightHistory: ", weightHistory)
    const realm = useRealm();
    /*
    realm.write(()=>{
        const maxId = weightHistory.max('id')
        const nextId = maxId ? maxId + 1:1;
        //console.log("maxId: ", maxId)
        realm.create('ExerciseWeightHistory',{
            id: nextId,
            exerciseName: 'Wrist Pronation',
            weightValue: 10,
            day: '10.05.26',
            timestamp: Math.floor(Date.now() / 1000),
        })
        
    })
    */
    
    //console.log("dayData.keys: ", dayData.keys)

    
    return(
        <View style={{borderColor:'red', borderWidth:1}}>
            {dayData.fullDay.map(exercise => {
                const exerciseKeys = dayData.keys
                //console.log("exerciseKeys: ",exerciseKeys)

            })&&
            <View style={[styles.table]}>
                <NamesBlock values={dayData}/>
                <InfoBlock currentDayData={weightHistory} dayData={dayData} />
            </View>
                
                
            }
        </View>
    )
}

