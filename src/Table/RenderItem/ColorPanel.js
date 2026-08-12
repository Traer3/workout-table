import { Pressable, View, } from "react-native";
import styles, { TextColor } from './renderItemStyles.js'
import { useRealm } from "../../db/realm.js";

export default function ColorPanel({ currentDayData, name, field, mode }) {
    //console.log("mode: ", mode)
    //console.log("currentDayData: ", currentDayData)
    const realm = useRealm();
    const updateColor = (exKey, fieldKey, text) => {
      console.log("exKey: ", exKey)
      console.log("fieldKey: ", fieldKey)
      console.log("text: ", text)
    
      if(!currentDayData || !currentDayData.isValid()){
        return null;
      }
      
      realm.write(() => {
        if (mode === "weight") {
          if( currentDayData[fieldKey]){
            currentDayData[fieldKey].color = String(text) || "";
            console.log("Data updated! ")
          }
          return;
        }

        /*
        [{"exerciseKey": "PU", "fullName": "Push Ups", "reps1": [Object], "reps2": [Object], "rest1": [Object], "rest2": [Object]}, 
        нужно найти индекс 
        */
        console.log("currentDayData.exercises[exKey]: ",currentDayData.exercises["exerciseKey"])
        if (currentDayData.exercises[exKey] && currentDayData.exercises[fieldKey]) {
          currentDayData.exercises[fieldKey].color = String(text) || "";
          console.log("wo")
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