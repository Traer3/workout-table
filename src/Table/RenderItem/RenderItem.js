import { memo, useState } from "react";
import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import DateBlock from "./DateBlock.js";
import NamesBlock from "./NamesBlock.js";
import InfoBlock from "./InfoBlock.js";
import { useObject, useQuery, useRealm } from "../../db/realm.js";
import { useDatabase } from "../../../DatabaseContext.js";
import IconButton from "../../IconButton.js"; 
import Loading from "./Loading.js";
import WeightTable from "./WeightTable.js";

const RenderItem = ({ item, index, data, setData, flatListRef, elementIndex , setElementIndex }) => {
  
  const [loading, setLoading] = useState(false);

  const currentDayData = useObject('WorkoutDay', item);

  const dayData = readData(currentDayData)

  const [editingCell, setEditingCell] = useState(null);
  

  if (!currentDayData || !currentDayData.isValid()) {
    return null;
  }
  if (!item) return null

  setElementIndex(prev => prev + 1)

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

  function readData(currentDay) {
    //console.log("currentDay: ", currentDay["exercises"])
    const keys = [];
    const data = [];
    const fullDay = [];
    const exerciseKeys = new Set();
    currentDay["exercises"].map(exercise => {
      keys.push(exercise["exerciseKey"])
      data.push(exercise)
      fullDay.push()
    })
    return null;
    /*
    const keys = [];
    const data = [];
    const fullDay = [];
    const exerciseKeys = new Set();
    const currentDayDataKeys = Object.keys(currentDay);

    //Я могу сразу тут собрать всю информацию так как уже прохожусь по нужным ключам 
    currentDayDataKeys.map(key => {
      if (currentDay[key] !== null && key !== 'day') {
        const currentFullName = currentDay[key]["fullName"];
        
        keys.push(key);
        data.push(currentDay[key])
        fullDay.push({ [key]: currentDay[key] })
        const currentExerciseKeys = Object.keys(currentDay[key])
        currentExerciseKeys.map(key => {
          if (key !== 'fullName') {
            exerciseKeys.add(key);
          }
        })
      }
    });
    */

    const dayData = {
      keys: keys,
      data: data,
      fullDay: fullDay,
      exerciseKeys: [...exerciseKeys],
    }
    return dayData
  }

  return (
    <>{loading ? (//loading
      //<Loading dayData={dayData} index={index}/>
      <WeightTable 
            exerciseDayData={dayData} //эту хуйню убрать 
            item={item} 
            loading={loading} 
            setLoading={setLoading}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            flatListRef={flatListRef}
            index={index}
            />
      ) : (
        <View style={{ marginBottom: 64, }}>
          
        <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
          <DateBlock
            currentDayData={currentDayData}
          />
        </View>
        <View style={[styles.table]}>
          <NamesBlock currentDayData={currentDayData} />
          <InfoBlock
            currentDayData={currentDayData}
            dayData={dayData}//эту хуйню убрать 
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            index={index}
            flatListRef={flatListRef}
            elementIndex={elementIndex}
          />
          
        </View>
      </View>
      )
    }</>
  )

}

export default memo(RenderItem);
