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

const RenderItem = ({ item, index, data, setData, flatListRef }) => {
  const [loading, setLoading] = useState(false);

  const currentDayData = useObject('WorkoutDay', `${item}`);
  


  const dayData = readData(currentDayData)

  const [editingCell, setEditingCell] = useState(null);

  //console.log("currentDayData: ",currentDayData)

  if (!currentDayData || !currentDayData.isValid()) {
    return null;
  }
  if (!item) return null

  //console.log("RenderItem AWAKE!: ",item)

  function readData(currentDay) {
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
            exerciseDayData={dayData} 
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
            item={item}
            currentDayData={currentDayData}
            loading={loading}
            setLoading={setLoading}
          />
        </View>
        <View style={[styles.table]}>
          <NamesBlock values={dayData} />
          <InfoBlock
            currentDayData={currentDayData}
            dayData={dayData}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            index={index}
            flatListRef={flatListRef}
          />
        </View>
      </View>
      )
    }</>
  )

}

export default memo(RenderItem);
