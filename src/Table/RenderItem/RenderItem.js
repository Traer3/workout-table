import { memo, useState } from "react";
import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import DateBlock from "./DateBlock.js";
import NamesBlock from "./NamesBlock.js";
import InfoBlock from "./InfoBlock.js";
import { useTools } from "../../../StyleAssistant.js";

const RenderItem = ({ item, index, data, setData, saveToPhone, flatListRef }) => {
  if (!item || typeof item !== 'object') return null
  if (!data) return null;

  const [editingCell, setEditingCell] = useState(null);
  const [values, setValues] = useState(item);

  const exerciseNames = Object.keys(item).filter(key => key !== 'day' && key !== 'weights');
  const exerciseNamesKyes = exerciseNames.map(key => Object.keys(values[key]).filter(filterKey => filterKey !== "fullName")).flat()
  const exerciseKeys = [...new Set(exerciseNamesKyes.map(key => key))];

  const [changeWeight, setChangeWeight] = useState(false);

  //const weightsKey = Object.keys(values).filter(key => key === 'weights')
  const [weightsValues, setWeightValues] = useState(values['weights'])
  const weightsNames = Object.keys(weightsValues)
  const weightsNamesKyes = weightsNames.map(key => Object.keys(weightsValues[key]).filter(filterKey => filterKey !== "fullName")).flat()
  const weightsKeys = [...new Set(weightsNamesKyes.map(key => key))];

  

  const { backgroundColor } = useTools()

  const toogleSave = (data) => {
    saveToPhone(data)
    setEditingCell(null)
  }



  return (
    <View style={{ marginBottom: 64, borderColor: 'red', borderWidth: 1 }}>
      <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
        <DateBlock
          item={item}
          changeWeight={changeWeight}
          setChangeWeight={setChangeWeight}
          toogleSave={() => { toogleSave(data) }}
          saveToPhone={() => { saveToPhone(data) }}
        />
      </View>
      <View style={[styles.table]}>
        {changeWeight ? (
          <>
            <NamesBlock exerciseNames={weightsNames} values={weightsValues} />
            <InfoBlock
              exerciseNames={weightsNames}
              exerciseKeys={weightsKeys}
              values={weightsValues}
              setValues={setWeightValues}
              data={data}
              setData={setData}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              index={index}
              saveToPhone={saveToPhone}
              flatListRef={flatListRef}
              toogleSave={toogleSave}
              color={true}
            />
          </>
        ) : (
          <>
            <NamesBlock exerciseNames={exerciseNames} values={values} />
            <InfoBlock
              exerciseNames={exerciseNames}
              exerciseKeys={exerciseKeys}
              values={values}
              setValues={setValues}
              data={data}
              setData={setData}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              index={index}
              saveToPhone={saveToPhone}
              flatListRef={flatListRef}
              toogleSave={toogleSave}
            />
          </>
        )}
      </View>

    </View>
  )

}

export default memo(RenderItem);

