import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useDatabase } from "../../DatabaseContext";
import IconButton from "../IconButton.js";
import RenderItem from "./RenderItem/RenderItem.js";
import { useRealm } from "../db/realm.js";

export default function WorkoutTable() {
  const { uploadToDrive, workoutTable, weightHistory } = useDatabase()
  const flatListRef = useRef(null);
  //console.log("WorkoutTable AWAKE!")

  const allDays = getAllDays(workoutTable);
  //console.log("workoutTable: ", workoutTable)

  function getAllDays(allData) {
    const days = []
    if (!allData) return days;

    allData.forEach(obj => {
      if (obj && obj.isValid()) {
        days.push(obj["day"])
      }
    });
    return days
  }

  const uploadToCloud = async () => {
    await uploadToDrive();
  }
  
  
  /*
  const realm = useRealm(); 
  const deleteAllDays = (allDays) => {
    allDays.map(day =>{
          console.log("Deleting day :" ,day)
          realm.write(() => {
            const deletee = realm.objectForPrimaryKey('WorkoutDay', day)
            realm.delete(deletee);
          })
    })
    <IconButton buttFunction={() => deleteAllDays(allDays)} color={true}/>
  }
  */


  const renderItem = useCallback(({ item, index }) => (
    <RenderItem
      item={item} // это уже сам день "09.07.26"
      index={index}
      flatListRef={flatListRef}
    />
  ));

  return (
    <View>
      <IconButton buttFunction={() => uploadToCloud()} />
      
      <View style={{ alignItems: 'center', marginBottom: 100 }}>
        <FlatList
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          style={styles.conteiner}
          data={allDays}
          renderItem={renderItem}
        /*
        initialNumToRender={data.length //меня ебет чет другое делать
        }
        */
        /*
        keyExtractor={(item) => item.day}
        initialNumToRender={data.length //меня ебет чет другое делать
        }
        */
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    height: "100%",
    width: '100%',
    borderWidth: 0.1,
    marginTop: 40,
  },

});

//OLD
/*
  useEffect(() => {
    const index = getInitialIndex(data);
    //console.log("index",index)
    setTimeout(() => {
      flatListRef.current.scrollToIndex({
        index: index,
        animated: false,
      });
    }, 100);
  }, [])

  function getInitialIndex(data) {
    let index = 0
    for (let i = 0; i < data.length; i++) {
      const day = data[i];
      const exercise = Object.keys(day).find(key => key !== 'day');
      if (exercise) {
        const exerciseData = day[exercise];
        if (exerciseData.reps1.value === 0 && exerciseData.reps2.value === 0) {
          index = i;
          return index;
        }
      }
    }
    return index;
  }
  */


