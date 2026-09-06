import { Pressable, View, } from "react-native";
import styles, { TextColor } from './renderItemStyles.js'
import { useRealm } from "../../db/realm.js";

export default function ColorPanel({ currentDayData, name, field, mode, index }) {

  const realm = useRealm();
  const updateColor = (fieldKey, subKey, color) => {

    if (!currentDayData || !currentDayData.isValid()) {
      return null;
    }

    realm.write(() => {
      if (mode === "weight") {
        if (currentDayData[fieldKey]) {
          currentDayData[fieldKey].color = String(text) || "";
          console.log("Data updated! ")
        }
        return;
      }

      if (currentDayData.exercises[index - 1] && currentDayData.exercises[index - 1].exerciseKey === fieldKey) { // убрать exerciseKey и заменить на fullName, я уже передаю fullName как ключ
        currentDayData.exercises[index - 1][subKey].color = String(color) || "";
      }
      return;
    })

  }
  return (
    <View style={[{ position: 'absolute', bottom: -63, left: -70, flexDirection: 'row', zIndex: 999, elevation: 5 }]}>
      <Pressable style={[styles.coloredBox, { backgroundColor: 'red', }]} onPressIn={() => updateColor(name, field, "red")} />
      <Pressable style={[styles.coloredBox, { backgroundColor: 'green', }]} onPressIn={() => updateColor(name, field, "green")} />
      <Pressable style={[styles.coloredBox, { backgroundColor: TextColor, }]} onPressIn={() => updateColor(name, field, TextColor)} />
    </View>
  )
}