import { View } from "react-native"
import InfoBlock from "./InfoBlock"
import { useDatabase } from "../../../DatabaseContext"
import { useRealm } from "../../db/realm";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import { useState } from "react";
import NamesBlock from "./NamesBlock";



export default function WeightTable({ dayData }) {
    /*
    currentDayData:  {
        "BR": null, "BSS": null, "EP": null, "ETK": null, "LR": null, 
        "PU": {"fullName": "Push Ups", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
        "RWC": {"fullName": "Reverse Wrist Curl", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
        "SCR": null, "SU": null, "Sq": null, "WC": {"fullName": "Wrist Curl", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
        "WP": {"fullName": "Wrist Pronation", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
        "WS": {"fullName": "Wrist Suplination", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
        "WSC": {"fullName": "Wrist Side Curl", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
        "day": "10.07.26"
    }
    dayData:  {
        "data": [[Object], [Object], [Object], [Object], [Object], [Object]], 
        "exerciseKeys": ["reps1", "rest1", "reps2", "rest2"], 
        "fullDay": [
                                
            {"PU": [Exercise]},    //{"PU": {"fullName": "Push Ups", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}}
            {"RWC": [Exercise]}, 
            {"WC": [Exercise]}, 
            {"WSC": [Exercise]}, 
            {"WP": [Exercise]}, 
            {"WS": [Exercise]}
        ], 
        "keys": ["PU", "RWC", "WC", "WSC", "WP", "WS"]
    }
    */


    //Итоговый , будем собирать нужный объект внутри WeightTable.js 
    /*
    {
     "id": 4,
     "day": "12.05.26", 
     "timestamp": 1784493685, 
     "fullName": "Wrist Pronation",
     "weightData":{
         "color": "green", 
         "value": 10 
     }
     }
    */

    const { weightHistory } = useDatabase();

    const [editingCell, setEditingCell] = useState(null);
    //console.log("weightHistory: ", weightHistory)

    /*
        [
            {
                "day": "19.03.26", 
                "fullName": "Wrist Pronation", 
                "id": 0, 
                "timestamp": 1784801814, 
                "weightData": [Object]
            }, 
        ]
    */

    //console.log("dayData.keys: ", dayData.keys)


    return (
        <View style={{ borderColor: 'red', borderWidth: 1 }}>
            {dayData.fullDay.map(exercise => {
                const exerciseKeys = dayData.keys
                //console.log("exerciseKeys: ",exerciseKeys)

            }) &&
                <View style={[styles.table]}>
                    <NamesBlock values={dayData} />
                    <InfoBlock currentDayData={weightHistory} dayData={dayData} />
                </View>


            }
        </View>
    )
}



/*
    const realm = useRealm();
    
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