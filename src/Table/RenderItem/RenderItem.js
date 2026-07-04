import { memo, useState } from "react";
import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import DateBlock from "./DateBlock.js";
import NamesBlock from "./NamesBlock.js";
import InfoBlock from "./InfoBlock.js";

const RenderItem = ({ item, index, data, setData, saveToPhone, flatListRef }) => {
  if (!item || typeof item !== 'object') return null
  if (!data) return null;

  const [editingCell, setEditingCell] = useState(null);
  const exerciseNames = Object.keys(item).filter(key => key !== 'day' && key !== 'weights');
  const [values, setValues] = useState(item);
  const [changeWeight, setChangeWeight] = useState(false);

  const toogleSave = (data) => {
    saveToPhone(data)
    setEditingCell(null)
  }

  return (
    <View style={{ marginBottom: 64, }}>
      <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20, }}>
        <DateBlock 
          item={item} 
          changeWeight={changeWeight}
          setChangeWeight={setChangeWeight}
          toogleSave={() => { toogleSave(data) }} 
          saveToPhone={() => { saveToPhone(data) }} 
          />
      </View>

      <View style={[styles.table]}>
        <NamesBlock exerciseNames={exerciseNames} values={values}/>
        <InfoBlock 
              exerciseNames={exerciseNames}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              values={values}
              setValues={setValues}
              data={data}
              setData={setData}
              index={index}
              changeWeight={changeWeight}
              setChangeWeight={setChangeWeight}
              saveToPhone={saveToPhone}
              flatListRef={flatListRef}
              toogleSave={toogleSave}/>
        
      </View>
    </View>
  )

}

export default memo(RenderItem);

