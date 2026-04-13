import { memo, useState } from "react";
import { StyleSheet,Pressable, Text, View,TextInput, } from "react-native";
import { useTools } from "../../StyleAssistant";

const RenderItem = ({item, index, data, setData, saveToPhone, flatListRef}) => {
    if(!data) return null;
    const {RedBorder,YellowBorder} = useTools();

    const [editingCell, setEditingCell] = useState(null);
    const exerciseNames = Object.keys(item).filter(key => key !== 'day');
    const [values, setValues] = useState(item);
    
    const updateValue = (exName, field, text) => {
    
    const numericValue = text 
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
    };

    const toogleSave = (data) =>{
      saveToPhone(data)
      setEditingCell(null)
    }
    
    const updateColor = (exName, field, newColor) =>{
      console.log("Color: ",newColor)
      const newValues = {
        ...values,
          [exName]:{
            ...values[exName],
            [field]:{
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

    const toogleEditingCell = (cellId) => {
      
      setEditingCell(cellId);
      flatListRef.current?.scrollToIndex({
        index:index,
        animated:true,
        viewPosition: 0,
      })
    }
    

    
    return(
        <View style={{marginBottom:64,}}>
    
        <View style={{borderColor:borderColor,borderWidth:1.2,height:20,}}>
          <Pressable 
            style={{
              margin:'-10'
            }}
            onPress={()=>{console.log("Presed!")}}
          >
            <TextInput 
              style={[styles.textStyle]}
              onChangeText={(text)=> {
                item.day = text; // мутабельная срань , потом поменяю ^_^
              }
              }
              onSubmitEditing={()=>{toogleSave(data)}}
              onEndEditing={()=>{saveToPhone(data)}}
              >
                  {item.day}
            </TextInput>

          </Pressable>
            
        </View>
            
        <View style={[styles.table, ]}>

            <View style={[styles.rowName]}>
                {exerciseNames.map((name)=>(
                  <Text key={name} style={[styles.cell, styles.textStyle]}>{name}</Text>
                ))} 
            </View>

            <View style={{flex:3,flexDirection:'column',zIndex:1
              }}>
                {exerciseNames.map((name)=>{
                  const isRowEditing = editingCell && editingCell.startsWith(name);

                  return(
                    <View key={name} style={[styles.row , {
                      //overflow:'hidden'
                      zIndex:isRowEditing ? 100 : 1
                      }]}> 
                      {['reps1','rest1','reps2','rest2'].map((field)=>{
                        const cellId = `${name}-${field}`;
                        const isThisCellEditing = editingCell === cellId;
  
                        return(
                          <Pressable 
                            key={field}
                            style={[styles.pressableCell,{
                              overflow:'visible',
                              //borderColor:'red',
                              //borderWidth:1
                            }]}  
                            onPress={()=> toogleEditingCell(cellId)}>
                              {
                              isThisCellEditing ? (
                                <View style={{position:'absolute',height:"100%",width:'100%',overflow:'visible',zIndex:120,}}>
                                  <TextInput
                                    
                                    style={[styles.cell, styles.input, styles.textStyle,{}]}
                                    keyboardType="numeric"
                                    autoFocus={true}
                                    value={String(
                                      typeof values[name][field] === 'object'
                                        ? values[name][field].value
                                        : values[name][field]
                                    )}
                                    onChangeText={(text)=> updateValue(name,field,text)}
                                    onBlur={()=> setEditingCell(null)}
                                    onSubmitEditing={()=>{toogleSave(data)}}
                                    onEndEditing={()=>{saveToPhone(data)}}
                                  />
                                  
                                  <View style={[ {position:'absolute' ,bottom:-63,left:-70,flexDirection:'row',zIndex:999,elevation:5,}]}>
                                    <Pressable style={[styles.coloredBox, {backgroundColor:'red',}]} onPressIn={()=> updateColor(name, field, "red")}/>
  
                                    <Pressable style={[ styles.coloredBox,{backgroundColor:'green',}]} onPressIn={()=> updateColor(name, field, "green")}/>
  
                                    <Pressable style={[styles.coloredBox, {backgroundColor:'#EBF8E7',}]} onPressIn={()=> updateColor(name, field, "#EBF8E7")}/>
                                    
                                  </View>

                                </View>
                               
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
                        )
                      })}
                    </View>
                  )
                })}
    
                  
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
  },
  coloredBox:{
    zIndex:999,
    height:60,
    width:60,
    elevation:5,

  }
})