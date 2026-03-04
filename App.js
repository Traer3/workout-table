import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import DBTable from "./database.json"
import { useState } from "react";

const borderColor =  "#4C7DC0";
const textColor = '#EBF8E7';
export default function App() {

  //const [data, setData] = useState(DBTable);
  
  const data = [{
    day: "26.02.26",
    RWC: { "reps1": 50, "rest1": 7, "reps2": 50, "rest2": 7 },
    WC: { "reps1": 49, "rest1": 10, "reps2": 50, "rest2": 7 },
    WSC: { "reps1": 72, "rest1": 8, "reps2": 72, "rest2": 6 },
    WP: { "reps1": 25, "rest1": 8, "reps2": 36, "rest2": 0 }
  }];
  

  const Item = ({item}) => {
    const exerciseNames = Object.keys(item).filter(key => key !== 'day');
    return(
      <View>
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
                <Pressable style={styles.pressableCell} onPress={()=>console.log("help")}>
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
            ))}

              
          </View>
        </View>
        {false && <View style={{position:'absolute',borderColor:'red',borderWidth:1,height:"40%",width:'100%',marginTop:500,backgroundColor:'rgba(46,52,110,0.9)'}}>
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

                  <Pressable>
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
                    <Text style={styles.numberPanelCell}>Nope</Text>
                  </Pressable>

              </View>
              
              
            </View>
            
          </View>}
      </View>
    )
  }  

  /*
<Pressable>
                    <Text style={styles.cell}>Okey</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.cell}>Null</Text>
                  </Pressable>

                  <Pressable>
                    <Text style={styles.cell}>Nope</Text>
                  </Pressable>
  */
  return (
    <View style={{height:'100%',width:'100%', backgroundColor: '#2E346E',alignItems:'center', }}>
      <FlatList
        style={styles.conteiner}
        data={data}
        renderItem={({item}) => <Item item={item} />}
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
  borderColor:borderColor,
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
}
 
});



