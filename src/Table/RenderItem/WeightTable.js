import { Pressable, View, TextInput } from "react-native"
import InfoBlock from "./InfoBlock"
import { useDatabase } from "../../../DatabaseContext"
import { useRealm } from "../../db/realm";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import { useState } from "react";
import NamesBlock from "./NamesBlock";
import DateBlock from "./DateBlock.js";

export default function WeightTable({ currentDayData, item, loading, setLoading,  editingCell, setEditingCell, flatListRef, index, }) {
    const { weightHistory } = useDatabase();
    /*
        {
            "day": "-1", 
            "fullName": "Push Ups", 
            "id": 1, 
            "timestamp": 1786545550, 
            "weightData": {
                            "color": "", 
                            "value": 0
                        }
        },
    */
    const realm = useRealm()
   
    const weightDayData = createDayData(currentDayData);
    //console.log("weightDayData: ", weightDayData)

    const maxId = weightHistory.max('id')

    //console.log("weightHistory: ",weightHistory)

    function getExerciseData(exerciseName) {
        //console.log("exerciseName: ",exerciseName)
        const exerciseHistory = realm
                .objects('ExerciseWeightHistory')
                .filtered('fullName == $0', `${exerciseName}`)
                .sorted('id',false);//Сортирует по возрастанию , я всегда создаю новую запись с новым id и новым весом 
        //console.log("exerciseHistory: ",exerciseHistory)
        return exerciseHistory;
        
    }

    function createDay(exerciseName) {
        if(!exerciseName || !exerciseName === "") return
        const maxId = weightHistory.max('id')
        const nextId = maxId ? maxId + 1 : 1;
        realm.write(() => {
            realm.create('ExerciseWeightHistory', {
                id: nextId,
                day: "-1",
                fullName: exerciseName,
                timestamp: Math.floor(Date.now() / 1000),
                weightData: { color: '', value: 0 }
            })
        })
    }
    

    /*
    [
      {
        "exerciseKey": "PU", 
        "fullName": "Push Ups", 
        "reps1": [Object], 
        "reps2": [Object], 
        "rest1": [Object], 
        "rest2": [Object]
      }, 
      {
        "exerciseKey": "RWC", 
        "fullName": "Reverse Wrist Curl", 
        "reps1": [Object], 
        "reps2": [Object], 
        "rest1": [Object], 
        "rest2": [Object]
      }, 
      */


    function createDayData(currentDayData) {
        const keys = [];
        const data = [];
        const fullDay = [];
        currentDayData.exercises.map((exercise)=>{
            const key = exercise.exerciseKey
            const fullName = exercise.fullName
            const exerciseHistory = getExerciseData(fullName)


            //console.log("key: ", key)
            //console.log("fullName: ", fullName)
            //console.log("exerciseHistory: ", exerciseHistory)


            if(exerciseHistory.length > 0){
                const freshExerciseData = exerciseHistory[exerciseHistory.length-1]
                keys.push(key)
                fullDay.push({[key]: {
                    ["id"]:freshExerciseData["id"],
                    ["fullName"]:freshExerciseData["fullName"],
                    ["weightData"]: freshExerciseData["weightData"],
                    ["timestamp"]:freshExerciseData["timestamp"]
                    }
                })
            }else{
             console.log(`New exercise: ${fullName} added!`)
             createDay(fullName)
            }
        })
        const dayData = {
            day : item,
            keys: keys,
            data: data,
            fullDay: fullDay,
            exerciseKeys: ["weightData"],
          }
        return dayData
    }

    return (
        <View //style={{ borderColor: 'red', borderWidth: 1 }}
            >
            <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
                      <DateBlock
                        currentDayData={weightHistory}
                        loading={loading}
                        setLoading={setLoading}
                      />
            </View>
            <View style={[styles.table]}>

                    {
                        /*
                        <NamesBlock values={weightDayData} //передавать сюда активный объект от realm , значит нужно передавать id
                        />
                        */
                    }
                    {
                        /*
                        <InfoBlock 
                            currentDayData={weightHistory} //нужно currentDayData.exercises. значит мне нужно создать объект который он будет читать или 
                            //разбить InfoBlock на  InfoBlock и на InfoForm
                            dayData={weightDayData} 
                            mode={"weight"}
                            editingCell={editingCell}
                            setEditingCell={setEditingCell}
                            flatListRef={flatListRef}
                            index={index}
                            maxId={maxId}
                        /> 
                        */
                    }
            </View>
        </View>
    )
}

