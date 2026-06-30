import { FlatList, Pressable, StyleSheet, View, Image } from "react-native";
import { useCallback,useRef, useState } from "react";

import RenderItem from "./RenderItem";
import { useTools } from "../../StyleAssistant";
import shareIcon from "../../assets/share.png"
import { useDatabase } from "../../DatabaseContext";
import IconButton from "../IconButton.js";

export default function WorkoutTable() {
  const {uploadToDrive, info, saveDataToPhone} = useDatabase()
  const { backgroundColor } = useTools();

  const flatListRef = useRef(null);
  const [data, setData] = useState(info);

  const uploadToCloud = async(data) => {
    await uploadToDrive(data);
  }

  const saveToPhone = async(newData) => {
    await saveDataToPhone(newData)
  }
  

  const renderItem = useCallback(({ item, index }) => (
    <RenderItem
      item={item}
      index={index}
      data={data}
      setData={setData}
      saveToPhone={saveToPhone}
      flatListRef={flatListRef}
    />
  ));

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: backgroundColor }}>
      <Pressable
        style={{
          marginTop: 35,
          height: 50,
          width: 50,
          marginBottom: -40,
        }}
        onPressIn={() => {
          uploadToCloud(data)
        }}
      >
        <Image source={shareIcon} style={{ width: 40, height: 40 }} resizeMode="contain" />
      </Pressable>
      <View style={{ alignItems: 'center', marginBottom: 100 }}>
        <FlatList
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          style={styles.conteiner}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.day}
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


