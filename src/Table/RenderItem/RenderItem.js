import { memo, useState } from "react";
import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import DateBlock from "./DateBlock.js";
import NamesBlock from "./NamesBlock.js";
import InfoBlock from "./InfoBlock.js";
import { useObject, useQuery, useRealm } from "../../db/realm.js";

const RenderItem = ({ item, index, data, setData, saveToPhone, flatListRef }) => {
  if (!item) return null
  const currentDayData = useObject('WorkoutDay', `${item}`);
  
  const dayData = readData(currentDayData)

  const [editingCell, setEditingCell] = useState(null);

  const exerciseKeys = []

  const weightHistory = useQuery('ExerciseWeightHistory').sorted('timestamp', true);
  //console.log("weightHistory", weightHistory);

  function readData(currentDay) {
    const keys = [];
    const data = [];
    const fullDay = [];
    const exerciseKeys = new Set();
    const currentDayDataKeys = Object.keys(currentDay);
    currentDayDataKeys.map(key => {
      if (currentDay[key] !== null && key !== 'day') {
        keys.push(key);
        data.push(currentDay[key])
        fullDay.push({ [key]: currentDay[key] })
        const currentExerciseKeys =  Object.keys(currentDay[key])
        currentExerciseKeys.map(key => {
          if(key !== 'fullName'){
            exerciseKeys.add(key);
          }
        })
      }
    });
    
    //console.log("exerciseKeys: ",exerciseKeys)
    //exerciseKeys.map(key => console.log(key))
    //const uniqueExerciseKeys = new Set()
    const dayData = {
      keys: keys,
      data: data,
      fullDay: fullDay,
      exerciseKeys: [...exerciseKeys],
    }
    return dayData
  }

  return (
    <View style={{ marginBottom: 64, }}>
      <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
        <DateBlock
          item={item}
          currentDayData={currentDayData}
        //changeWeight={changeWeight}
        //setChangeWeight={setChangeWeight}
        />
      </View>
      <View style={[styles.table]}>
        <NamesBlock values={dayData} />
        <InfoBlock
          currentDayData = {currentDayData}
          dayData={dayData}
          exerciseKeys={exerciseKeys}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          index={index}
          flatListRef={flatListRef}
        />
      </View>
    </View>
  )

}

export default memo(RenderItem);
