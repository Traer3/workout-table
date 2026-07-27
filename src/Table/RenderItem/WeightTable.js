import { Pressable, View } from "react-native"
import InfoBlock from "./InfoBlock"
import { useDatabase } from "../../../DatabaseContext"
import { useRealm } from "../../db/realm";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import { useState } from "react";
import NamesBlock from "./NamesBlock";
import DateBlock from "./DateBlock.js";



export default function WeightTable({ exerciseDayData, item, loading, setLoading,  editingCell, setEditingCell, flatListRef, index, }) {
    //console.log("dayData: ", dayData["data"])

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


    const { weightHistory } = useDatabase();
    const realm = useRealm()
   
    
    
    const weightDayData = createDayData(exerciseDayData);

    const maxId = weightHistory.max('id')

    //console.log("weightHistory: ",weightHistory)

    function getExerciseData(exerciseName) {
        //console.log("exerciseName: ",exerciseName)
        const exerciseHistory = realm
                .objects('ExerciseWeightHistory')
                .filtered('fullName == $0', `${exerciseName}`)
                .sorted('id',false);//Сортирует по возрастанию , я всегда создаю новую запись с новым id и новым весом 
        console.log("exerciseHistory: ",exerciseHistory)
        return exerciseHistory;
        
    }

    /*
        [
            {
                "day": "19.03.26", 
                "fullName": "Wrist Pronation", 
                "id": 0, 
                "timestamp": 1784801814, 
                "weightData": [Object]
            }, 
            {
                "day": "10.05.26", 
                "fullName": "Wrist Pronation", 
                "id": 1, 
                "timestamp": 1784801814, 
                "weightData": [Object]
            }
        ]
    */
    

    function createDayData(exerciseDayData) {
        const keys = [];
        const data = [];
        const fullDay = [];
        //console.log()
        exerciseDayData.fullDay.map((exercise)=>{
            const key = Object.keys(exercise)[0];
            const fullName = exercise[key]?.["fullName"]
                //Используя полное имя , находим значение в weightHistory
            const exerciseHistory = getExerciseData(fullName)
            if(exerciseHistory.length > 0){
                 //Из массива нужно получить самое свежее значение
                const freshExerciseData = exerciseHistory[exerciseHistory.length-1]
                //Вот что получаю 
                //{"day": "10.05.26", "fullName": "Wrist Pronation", "id": 1, "timestamp": 1784801814, "weightData": {"color": "green", "value": 10}}
                
                //Вот что нужно в fullDay записать 
                //{"PU": {"fullName": "Push Ups", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}}
                keys.push(key)
                fullDay.push({[key]: {
                    ["fullName"]:freshExerciseData["fullName"],
                    ["weightData"]: freshExerciseData["weightData"]
                    }
                    
                })
            }
        })
        //console.log("fullDay: ",fullDay)
        //console.log("key: ",keys)
        const dayData = {
            day : item,
            keys: keys,
            data: data,
            fullDay: fullDay,
            exerciseKeys: ["weightData"],
          }
        return dayData
    }



    //console.log("weightDayData: ", weightDayData["day"])

    return (
        <View style={{ borderColor: 'red', borderWidth: 1 }}>
            <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
                      <DateBlock
                        item={item}
                        currentDayData={weightHistory}
                        loading={loading}
                        setLoading={setLoading}
                      />
            </View>
            <View style={[styles.table]}>
                    <NamesBlock values={weightDayData} />
                    <InfoBlock 
                        currentDayData={weightHistory} 
                        dayData={weightDayData} 
                        mode={"weight"}
                        editingCell={editingCell}
                        setEditingCell={setEditingCell}
                        flatListRef={flatListRef}
                        index={index}
                        maxId={maxId}
                        />
                    
            </View>
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