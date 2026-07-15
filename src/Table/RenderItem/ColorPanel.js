import { Pressable, View, } from "react-native";
import styles, { TextColor } from './renderItemStyles.js'
import { useRealm } from "../../db/realm.js";

export default function ColorPanel({ currentDayData, name, field }) {
    
    const realm = useRealm();
    const updateColor = (exKey, fieldKey, text) => {
      //console.log("exKey: ", exKey)
      //console.log("fieldKey: ", fieldKey)
      //console.log("text: ", text)
      
      realm.write(() => {
        if (currentDayData[exKey] && currentDayData[exKey][fieldKey]) {
          currentDayData[exKey][fieldKey].color = String(text) || "";
        }
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