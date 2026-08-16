import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useDatabase } from "../../DatabaseContext";
import IconButton from "../IconButton.js";
import RenderItem from "./RenderItem/RenderItem.js";

export default function WorkoutTable({ editDay, setEditDay }) {
  const { uploadToDrive, workoutTable } = useDatabase()
  const flatListRef = useRef(null);
  const allIds = getAllIds(workoutTable);

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
    if (allIds.length <= 0 || !allIds) return;
    const index = allIds.length - 1;
    
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

  const renderItem = useCallback(({ item, index }) => (
    <RenderItem
      item={item}
      index={index}
      flatListRef={flatListRef}
    />
  ));

  return (
    <>
      <View style={styles.mainBody}>
        <IconButton iconName={"share"} buttFunction={() => uploadToCloud()} />
        <IconButton iconName={"createDay"} buttFunction={() => setEditDay(!editDay)} />
      </View>

      <FlatList
        ref={flatListRef}
        keyboardShouldPersistTaps="handled"
        style={styles.conteiner}
        data={allIds}
        renderItem={renderItem}
        initialNumToRender={allIds.length}
        contentContainerStyle={{
          paddingBottom: 500
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conteiner: {
    height: "100%",
    width: '100%',
    borderWidth: 0.1,
  },

});

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