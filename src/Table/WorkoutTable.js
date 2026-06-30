import { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useDatabase } from "../../DatabaseContext";
import IconButton from "../IconButton.js";
import RenderItem from "./RenderItem/RenderItem.js";

export default function WorkoutTable() {
  const { uploadToDrive, info, saveDataToPhone } = useDatabase()

  const flatListRef = useRef(null);
  const [data, setData] = useState(info);

  const uploadToCloud = async (data) => {
    await uploadToDrive(data);
  }

  const saveToPhone = async (newData) => {
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
    <View>
      <IconButton buttFunction={() => uploadToCloud(data)} />
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


