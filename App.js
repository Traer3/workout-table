//npx expo install @react-native-async-storage/async-storage
import { FlatList, Pressable, StyleSheet, Text, View,TextInput } from "react-native";
import DBTable from "./database.json"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const borderColor =  "#4C7DC0";
const textColor = '#EBF8E7';
const backgroundColor = '#2E346E';

export default  function App() {
  const [data, setData] = useState(null)
  useEffect(()=>{
    const initLoad = async () =>{
      const loadedData = await loadFromPhone();
      setData(loadedData);
    };
    initLoad();
  },[])
 
  /*
  const data = [{
    day: "26.02.26",
    RWC: { 
      "reps1": {
        color:"",
        value: 0,
      }, 
      "rest1": {
        color:"",
        value: 0,
      }, 
      "reps2": {
        color:"",
        value: 0,
      }, 
      "rest2": {
        color:"",
        value: 0,
      } 
    },
    //WC: { "reps1": 49, "rest1": 10, "reps2": 50, "rest2": 7 },
    //WSC: { "reps1": 72, "rest1": 8, "reps2": 72, "rest2": 6 },
    //WP: { "reps1": 25, "rest1": 8, "reps2": 36, "rest2": 0 }
  }];
  */

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
  
  
  
  


  const Item = ({item, index}) => {
    const [isEditing, setIsEditing] = useState(false);
    const exerciseNames = Object.keys(item).filter(key => key !== 'day');
    const [values, setValues] = useState(item)

    const updateValue = (exName, field, text) => {
      const numericValue = text === '' ? 0 : parseInt(text) || 0;
      const newValues = {
        ...values,
        [exName]:{
          ...values[exName],
          [field]:typeof values[exName][field] === 'object'
          ? {...values[exName][field], value: numericValue}
          : numericValue
        }
      };
      setValues(newValues);

      const newData = [...data];
      newData[index] = newValues;
      setData(newData);
      saveToPhone(newData);
    };

    return(
      <View style={{borderColor:'red',borderWidth:1,}}>

        <View style={{borderColor:borderColor,borderWidth:1.2,height:20,}}>
            <Text style={{textAlign:'center',color:textColor,fontWeight:800}}>{item.day}</Text>
        </View>
        
        <View style={styles.table}>
          <View style={[styles.rowName]}>
              {exerciseNames.map((name)=>(
                <Text key={name} style={styles.cell}>{name}</Text>
              ))}
              
          </View>
          <View style={{flex:3,flexDirection:'column'}}>
            {exerciseNames.map((name)=>(
              <View key={name} style={styles.row}> 
                {['reps1','rest1','reps2','rest2'].map((field)=>(
                  <Pressable 
                    key={field}
                    style={styles.pressableCell}  
                    onPress={()=> setIsEditing(!isEditing)}>
                      {
                      isEditing ? (
                        <TextInput
                         
                          style={[styles.cell,styles.input]}
                          keyboardType="numeric"
                          //autoFocus={true}
                          value={String(
                            typeof values[name][field] === 'object'
                              ? values[name][field].value
                              : values[name][field]
                          )}
                          onChangeText={(text)=> updateValue(name,field,text)}
                          onBlur={()=> setIsEditing(false)}
                          //onSubmitEditing={()=>{setIsEditing(false)}}
                          //onEndEditing={()=>{setIsEditing(false)}}
                        />
                      ) : (
                      
                          <Text style={[
                            styles.cell,
                            {color: values[name][field]?.color || textColor}
                            ]}>
                            {typeof values[name][field] === 'object'
                              ? values[name][field].value
                              : values[name][field]
                            }
                          </Text>
                      
                      )}
                </Pressable>
                ))}
              </View>
            ))}

              
          </View>
        </View> 
      </View>
    )
  }

  if(!data) return null;
  return (
    <View style={{height:'100%',width:'100%', backgroundColor: '#2E346E',alignItems:'center', }}>
      <FlatList
        style={styles.conteiner}
        data={data}
        renderItem={({item, index}) => <Item item={item} index={index}/>}
        keyExtractor={(item)=> item.day}
      />
      
    </View>
  );
}
// backgroundColor: '#2E346E'
//borderColor:'#4C7DC0'
//text color '#EBF8E7'
let cellHeight = "20%"
let cellWidth = "20%"
let size = "100%" 

const styles = StyleSheet.create({
  conteiner: {
    height:"100%",
    width:'100%',
    borderWidth:0.1,
    marginTop:40,

},
table:{
  //borderContent: 'none',
  //borderColor:borderColor,
  borderColor:"yellow",
  borderWidth:1,
  flexDirection:'row',
  height:250,
  width:"100%",
  alignSelf:'center',  
  backgroundColor:'rgba(0,0,0,0.1)',
  
  
},
rowName:{
  flex:0.5,
  flexDirection:'column',
  borderColor:borderColor,
  borderWidth:0.1,
},
row:{
  //color:'#EBF8E7',
  flex:1,
  flexDirection:'row',
  borderColor:borderColor,
  borderWidth:0.1,
},

cell:{
  flex:1,
  color:textColor,
  borderColor:borderColor,
  borderWidth:1,
  textAlign:'center',
  textAlignVertical:'center',
  
},
pressableCell:{
  flex:1,
  borderColor:borderColor,
  borderWidth:0.1,
},


numberPanelTable:{
  height:'100%',
  width:'100%',
  borderColor:"green",
  borderWidth:2,
  flexDirection:'column',

  backgroundColor:'rgba(0,0,0,0.1)',
},
numberPanelRow:{
  //height:'14%',
  height:'71',
  justifyContent:'center',
  flexDirection:'row',
  borderColor:"yellow",
  borderWidth:1,
},
numberPanelCell:{
  height:'100%',
  width:'133',
  color:textColor,
  borderColor:borderColor,
  borderWidth:1,
  textAlign:'center',
  textAlignVertical:'center',
  fontWeight:'bold',
  fontSize:30,
},

numberPanelPressable:{
  borderColor:'purple',
  borderWidth:2,
},

editButton:{
  alignSelf:'flex-end',
  padding: 5,
  borderWidth:1,
  borderColor:borderColor,
  borderRadius:5,
  marginBottom:5,
},
editButtonText:{
  color:textColor,
  fontSize:30,
  fontWeight:'bold',
},
input:{
  backgroundColor:'rgba(76,125,192,0.2)',
  color:'#fff',
}
 
});



/*
//OLD
{numberPad && <View style={{borderColor:'green',borderWidth:1,flex:1,marginTop:"55%",backgroundColor:'rgba(46,52,110,0.9)'}}>
            <View style={styles.numberPanelTable}>
              <View style={styles.numberPanelRow}>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>normal</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>green</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>red</Text>
                  </Pressable>

                  </View>
              <View style={styles.numberPanelRow}>

                  <Pressable >
                    <Text style={styles.numberPanelCell}>1</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>2</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>3</Text>
                  </Pressable>

              </View>
              <View style={styles.numberPanelRow}>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>4</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>5</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>6</Text>
                  </Pressable>

              </View>

              <View style={styles.numberPanelRow}>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>7</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>8</Text>
                  </Pressable>

                  <Pressable >
                    <Text style={styles.numberPanelCell}>9</Text>
                  </Pressable>

              </View>

              <View style={styles.numberPanelRow}>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>Okey</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.numberPanelCell}>Null</Text>
                  </Pressable>

                  <Pressable >
                    <Text style={styles.numberPanelCell}>⟵</Text>
                  </Pressable>

              </View>
              
              
            </View>
            
          </View>}
*/

/*
          <View key={name} style={styles.row}>
                <Pressable style={styles.pressableCell} onPress={()=>{ changeValue(item[name].reps1);}}>
                  <Text style={styles.cell}>{item[name].reps1}</Text>
                </Pressable>
                <Pressable style={styles.pressableCell}>
                  <Text style={styles.cell}>{item[name].rest1}</Text>
                </Pressable>
                <Pressable style={styles.pressableCell}>
                  <Text style={styles.cell}>{item[name].reps2}</Text>
                </Pressable>
                <Pressable style={styles.pressableCell}>
                  <Text style={styles.cell}>{item[name].rest2}</Text>
                </Pressable>
              </View>
          */