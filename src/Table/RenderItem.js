import { memo, useState } from "react";
import { StyleSheet,Pressable, Text, View,TextInput } from "react-native";
import { useTools } from "../../StyleAssistant";

const RenderItem = ({item, index, data, setData, saveToPhone}) => {
    if(!data) return null;
    const {RedBorder,YellowBorder} = useTools();

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
        <View style={RedBorder}>
    
        <View style={{borderColor:borderColor,borderWidth:1.2,height:20,}}>
            <Text style={[styles.textStyle]}>{item.day}</Text>
        </View>
            
        <View style={[styles.table, YellowBorder]}>

            <View style={[styles.rowName]}>
                {exerciseNames.map((name)=>(
                  <Text key={name} style={[styles.cell, styles.textStyle]}>{name}</Text>
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
                             
                              style={[styles.cell, styles.input, styles.textStyle]}
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
                                styles.textStyle,
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

export default memo(RenderItem);

const borderColor =  "#4C7DC0";
const textColor = '#EBF8E7';

const styles = StyleSheet.create({
    textStyle:{
        color:textColor,
        fontWeight:800,
        textAlign:'center',
        textAlignVertical:'center',
    },
    conteiner: {
      height:"100%",
      width:'100%',
      borderWidth:0.1,
      marginTop:40,
  },
  table:{
    borderContent: 'none',
    borderColor:borderColor,

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
    borderColor:borderColor,
    borderWidth:1,
    
  },
  pressableCell:{
    flex:1,
    borderColor:borderColor,
    borderWidth:0.1,
  },
  
  input:{
    backgroundColor:'rgba(76,125,192,0.2)',
    color:'#fff',
  }
})