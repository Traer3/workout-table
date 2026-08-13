import { memo, useState } from "react";
import { Pressable, Text, TextInput, View, } from "react-native";
import styles, { TextColor, BorderColor } from './renderItemStyles.js'
import DateBlock from "./DateBlock.js";
import NamesBlock from "./NamesBlock.js";
import InfoBlock from "./InfoBlock.js";
import { useObject, useQuery, useRealm } from "../../db/realm.js";
import { useDatabase } from "../../../DatabaseContext.js";
import IconButton from "../../IconButton.js"; 
import Loading from "./Loading.js";
import WeightTable from "./WeightTable.js";

const RenderItem = ({ item, index, data, setData, flatListRef,}) => {
  const [loading, setLoading] = useState(false);

  const currentDayData = useObject('WorkoutDay', item);

  const [editingCell, setEditingCell] = useState(null);
  
  if (!currentDayData || !currentDayData.isValid()) {
    return null;
  }
  if (!item) return null


  return (
    <>{loading ? (//loading
      //<Loading dayData={dayData} index={index}/>
      <WeightTable 
            currentDayData={currentDayData}
            item={item} 
            loading={loading} 
            setLoading={setLoading}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            flatListRef={flatListRef}
            index={index}
            />
      ) : (
        <View style={{ marginBottom: 64, }}>
          
        <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
          <DateBlock
            currentDayData={currentDayData}
            loading={loading}
            setLoading={setLoading}
          />
        </View>
        <View style={[styles.table]}>
          <NamesBlock currentDayData={currentDayData} />
          <InfoBlock
            currentDayData={currentDayData}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            index={index}
            flatListRef={flatListRef}
            item={item}
          />
          
        </View>
      </View>
      )
    }</>
  )

}

export default memo(RenderItem);
