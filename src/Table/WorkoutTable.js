import { FlatList, StyleSheet, View } from "react-native";
import DBTable from "../../database.json"
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderItem from "./RenderItem";
import { useTools } from "../../StyleAssistant";

export default  function WorkoutTable() {
  const {backgroundColor} = useTools();

  const [data, setData] = useState(null)

  useEffect(()=>{
    const initLoad = async () =>{
      const loadedData = await loadFromPhone();
      setData(loadedData);
    };
    initLoad();
  },[])

  const saveToPhone = async (newData) => {
    try{
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem('@workout_data',jsonValue);
      console.log("Data saved!");
    }catch(err){
      console.error("Error saving data: ",err);
    }
  }

  const loadFromPhone = async () => {
    try{
      let jsonValue
      jsonValue = await AsyncStorage.getItem('@workout_data');
      return jsonValue != null ? JSON.parse(jsonValue) : DBTable
    }catch(err){
      console.error("Error while loading data");
    }
  }
  
  const renderItem = useCallback(({item, index }) => (
      <RenderItem 
          item={item} 
          index={index} 
          data={data} 
          setData={setData} 
          saveToPhone={saveToPhone}
      />
  ));

  return (
    <View style={{height:'100%',width:'100%', backgroundColor: backgroundColor,alignItems:'center', }}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        style={styles.conteiner}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item)=> item.day}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
conteiner: {
    height:"100%",
    width:'100%',
    borderWidth:0.1,
    marginTop:40,
},
 
});

