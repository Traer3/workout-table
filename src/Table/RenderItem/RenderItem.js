import { memo, useState } from "react";
import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import DateBlock from "./DateBlock.js";
import NamesBlock from "./NamesBlock.js";
import InfoBlock from "./InfoBlock.js";
import { useTools } from "../../../StyleAssistant.js";
import { useObject, useQuery, useRealm } from "../../db/realm.js";

const RenderItem = ({ item, index, data, setData, saveToPhone, flatListRef }) => {
  if (!item) return null
  const realm = useRealm();

  const [editingCell, setEditingCell] = useState(null);
  const [values, setValues] = useState(item);

  const exerciseNames = Object.keys(item).filter(key => key !== 'day' && key !== 'weights');
  const exerciseNamesKyes = exerciseNames.map(key => Object.keys(values[key]).filter(filterKey => filterKey !== "fullName")).flat()
  const exerciseKeys = [...new Set(exerciseNamesKyes.map(key => key))];


  const toogleSave = (data) => {
    saveToPhone(data)
    setEditingCell(null)
  }
  

  const weightHistory = useQuery('ExerciseWeightHistory').sorted('timestamp',true);
  //console.log("weightHistory", weightHistory);


  const currentDayData = useObject('WorkoutDay',`${item}`);
  //console.log("currentDayData: ",currentDayData)
  
  const dayData = readData(currentDayData)
  //console.log("dayData",dayData.keys)
  //console.log("dayData",dayData.data)


  function readData(currentDay) {
    const keys = [];
    const data = [];
    const currentDayDataKeys = Object.keys(currentDay);
    currentDayDataKeys.map(key => {
      if(currentDay[key] !== null || currentDay[key] !== ''){
        keys.push(key);
        data.push(currentDay[key])
      }
    });
    const dayData = {
      keys: keys,
      data: data
    }
    return dayData
  }

  function changeValue(currentDay,key,value){
    if(currentDay?.key){
      realm.write(()=>{
        currentDay.key.value = value;
      });
    }
  }

  return (
    <View style={{ marginBottom: 64, }}>
      <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
        <DateBlock
          item={item}
          //changeWeight={changeWeight}
          //setChangeWeight={setChangeWeight}
        />
      </View>
      <View style={[styles.table]}>
            <NamesBlock exerciseNames={exerciseNames} values={values} />
            <InfoBlock
              exerciseNames={exerciseNames}
              exerciseKeys={exerciseKeys}
              values={values}
              setValues={setValues}
              data={data}
              setData={setData}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              index={index}
              saveToPhone={saveToPhone}
              flatListRef={flatListRef}
              toogleSave={toogleSave}
            />
      </View>
    </View>
  )

}

export default memo(RenderItem);

//OLD
/*
import { memo, useState } from "react";
import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import DateBlock from "./DateBlock.js";
import NamesBlock from "./NamesBlock.js";
import InfoBlock from "./InfoBlock.js";
import { useTools } from "../../../StyleAssistant.js";
import { useObject, useQuery } from "../../db/realm.js";

const RenderItem = ({ item, index, data, setData, saveToPhone, flatListRef }) => {
  if (!item) return null

  const [editingCell, setEditingCell] = useState(null);
  const [values, setValues] = useState(item);

  const exerciseNames = Object.keys(item).filter(key => key !== 'day' && key !== 'weights');
  const exerciseNamesKyes = exerciseNames.map(key => Object.keys(values[key]).filter(filterKey => filterKey !== "fullName")).flat()
  const exerciseKeys = [...new Set(exerciseNamesKyes.map(key => key))];

  const [changeWeight, setChangeWeight] = useState(false);

  const [weightsValues, setWeightValues] = useState(values['weights']  || {})
  const weightsNames = weightsValues ? Object.keys(weightsValues) : []
  const weightsNamesKyes = weightsNames.map(key => Object.keys(weightsValues[key]).filter(filterKey => filterKey !== "fullName")).flat()
  const weightsKeys = [...new Set(weightsNamesKyes.map(key => key))];

  const toogleSave = (data) => {
    saveToPhone(data)
    setEditingCell(null)
  }
  

  const weightHistory = useQuery('ExerciseWeightHistory').sorted('timestamp',true);
  //console.log("weightHistory", weightHistory);


  const currentDayData = useObject('WorkoutDay',`${item}`);
  //console.log("currentDayData: ",currentDayData)
  
  const dayData = readData(currentDayData)
  //console.log("dayData",dayData.keys)
  //console.log("dayData",dayData.data)


  function readData(currentDay) {
    const keys = [];
    const data = [];
    const currentDayDataKeys = Object.keys(currentDay);
    currentDayDataKeys.map(key => {
      if(currentDay[key] !== null || currentDay[key] !== ''){
        keys.push(key);
        data.push(currentDay[key])
      }
    });
    const dayData = {
      keys: keys,
      data: data
    }
    return dayData
  }

  return (
    <View style={{ marginBottom: 64, }}>
      <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
        <DateBlock
          item={item}
          changeWeight={changeWeight}
          setChangeWeight={setChangeWeight}
          toogleSave={() => { toogleSave(data) }}
          saveToPhone={() => { saveToPhone(data) }}
        />
      </View>
      <View style={[styles.table]}>
        {changeWeight ? (
          <>
            <NamesBlock exerciseNames={weightsNames} values={weightsValues} />
            <InfoBlock
              exerciseNames={weightsNames}
              exerciseKeys={weightsKeys}
              values={weightsValues}
              setValues={setWeightValues}
              data={data}
              setData={setData}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              index={index}
              saveToPhone={saveToPhone}
              mode = {changeWeight}
              flatListRef={flatListRef}
              toogleSave={toogleSave}
            />
          </>
        ) : (
          <>
            <NamesBlock exerciseNames={exerciseNames} values={values} />
            <InfoBlock
              exerciseNames={exerciseNames}
              exerciseKeys={exerciseKeys}
              values={values}
              setValues={setValues}
              data={data}
              setData={setData}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              index={index}
              saveToPhone={saveToPhone}
              flatListRef={flatListRef}
              toogleSave={toogleSave}
            />
          </>
        )}
      </View>

    </View>
  )

}

export default memo(RenderItem);


*/