import { memo, useState } from "react";
import { View } from "react-native";
import { useObject } from "../../db/realm.js";
import WeightTable from "../WeightTable/WeightTable.js";
import DateBlock from "./DateBlock.js";
import InfoBlock from "./InfoBlock.js";
import NamesBlock from "./NamesBlock.js";
import styles, { BorderColor } from './renderItemStyles.js';

const RenderItem = ({ item, index, data, setData, flatListRef, }) => {
  const [loading, setLoading] = useState(false);

  const currentDayData = useObject('WorkoutDay', item);

  const [editingCell, setEditingCell] = useState(null);

  if (!currentDayData || !currentDayData.isValid()) {
    return null;
  }
  if (!item) return null


  return (
    <View style={{ marginBottom: 64, }}>

      <View style={{ borderColor: BorderColor, borderWidth: 1.2, height: 20 }}>
        <DateBlock
          currentDayData={currentDayData}
          loading={loading}
          setLoading={setLoading}
        />
      </View>

      {loading ? (
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
      )
      }
    </View>
  )

}

export default memo(RenderItem);
