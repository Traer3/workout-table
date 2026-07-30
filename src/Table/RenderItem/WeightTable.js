import { Pressable, View, TextInput } from "react-native"
import InfoBlock from "./InfoBlock"
import { useDatabase } from "../../../DatabaseContext"
import { useRealm } from "../../db/realm";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import { useState } from "react";
import NamesBlock from "./NamesBlock";
import DateBlock from "./DateBlock.js";




export default function WeightTable({ exerciseDayData, item, loading, setLoading,  editingCell, setEditingCell, flatListRef, index, }) {
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
        //console.log("exerciseHistory: ",exerciseHistory)
        return exerciseHistory;
        
    }
    
    function createDayData(exerciseDayData) {
        const keys = [];
        const data = [];
        const fullDay = [];
        exerciseDayData.fullDay.map((exercise)=>{
            const key = Object.keys(exercise)[0];
            const fullName = exercise[key]?.["fullName"]
            const exerciseHistory = getExerciseData(fullName)
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
                    <View style={[styles.row, {  }]}>
                        <Pressable   style={[styles.pressableCell, { overflow: 'visible', borderColor:'red', borderWidth:1,}]}>
                            <TextInput
                             style={[styles.cell, styles.input, styles.textStyle, {}]}
                            />
                        </Pressable>
                    </View>
                    
            </View>
        </View>
    )
}

