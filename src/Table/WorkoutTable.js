import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useDatabase } from "../../DatabaseContext";
import IconButton from "../IconButton.js";
import RenderItem from "./RenderItem/RenderItem.js";
import { useRealm } from "../db/realm.js";

export default function WorkoutTable({editDay, setEditDay}) {
  const { uploadToDrive, workoutTable, weightHistory } = useDatabase()
  const flatListRef = useRef(null);
  //console.log("WorkoutTable AWAKE!")


  const allIds = getAllIds(workoutTable);
  console.log("allIds: ", allIds)

  function getAllIds(allData) {
    //console.log("all data: ", allData)
    const ids = []
    if (!allData) return ids;

    allData.forEach(obj => {
      if (obj && obj.isValid()) {
        ids.push(obj["id"])
      }
    });
    return ids
  }


  useEffect(() => {
    if(allIds.length <= 0 || !allIds) return;
    const index = allIds.length - 1;
    //console.log("index", index)
    setTimeout(() => {
      flatListRef.current.scrollToIndex({
        index: index,
        animated: false,
      });
    }, 100);
  }, [])

  const uploadToCloud = async () => {
    await uploadToDrive();
  }


  /*
  const realm = useRealm(); 
  const deleteAllIds = (allIds) => {
    allIds.map(day =>{
          console.log("Deleting day :" ,day)
          realm.write(() => {
            const deletee = realm.objectForPrimaryKey('WorkoutDay', day)
            realm.delete(deletee);
          })
    })
    <IconButton buttFunction={() => deleteAllIds(allIds)} color={true}/>
  }
  */


  const renderItem = useCallback(({ item, index }) => (
    <RenderItem
      item={item} 
      index={index}
      flatListRef={flatListRef}
    />
  ));

  return (
    <View style={{}}>
      <View style={{marginTop: 35, flexDirection:'row',justifyContent:'space-between'}}>
        <IconButton buttFunction={() => uploadToCloud()} />
        <IconButton buttFunction={() => setEditDay(!editDay)} color={true}/>
      </View>
      <View style={{ alignItems: 'center',  marginTop:0 }}>
        <FlatList
          
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          style={styles.conteiner}
          data={allIds}
          renderItem={renderItem}

          initialNumToRender={allIds.length}
          contentContainerStyle={{
            paddingBottom:500
          }}
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
    //borderColor:'red',
    //marginTop: 40,

  },

});
