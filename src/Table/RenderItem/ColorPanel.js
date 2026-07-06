import { Pressable, View, } from "react-native";
import styles,{TextColor} from './renderItemStyles.js'

export default function ColorPanel({index,name,field,setValues, values, setData,data, saveToPhone}) {
    const updateColor = (exName, field, newColor) => {
        const newValues = {
          ...values,
          [exName]: {
            ...values[exName],
            [field]: {
              ...values[exName][field],
              color: newColor
            }
          }
        }
    
        setValues(newValues);
        const newData = [...data];
        newData[index] = newValues;
        setData(newData);
        saveToPhone(newData);
      };
    return (
        <View style={[{ position: 'absolute', bottom: -63, left: -70, flexDirection: 'row', zIndex: 999, elevation: 5}]}>
            <Pressable style={[styles.coloredBox, { backgroundColor: 'red', }]} onPressIn={() => updateColor(name, field, "red")} />

            <Pressable style={[styles.coloredBox, { backgroundColor: 'green', }]} onPressIn={() => updateColor(name, field, "green")} />

            <Pressable style={[styles.coloredBox, { backgroundColor: TextColor, }]} onPressIn={() => updateColor(name, field, TextColor)} />

        </View>
    )
}