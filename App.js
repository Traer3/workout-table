import { FlatList, StyleSheet, Text, View } from "react-native";
import DBTable from "./database.json"
import { useState } from "react";

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
        <View style={{borderColor:'#4C7DC0',borderWidth:1.2,height:20,}}>
            <Text style={{textAlign:'center',color:'#EBF8E7',fontWeight:800}}>{item.day}</Text>
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
                <Text style={styles.cell}>{item[name].reps1}</Text>
                <Text style={styles.cell}>{item[name].rest1}</Text>
                <Text style={styles.cell}>{item[name].reps2}</Text>
                <Text style={styles.cell}>{item[name].rest2}</Text>
              </View>
            ))}

              
          </View>
        </View>
      </View>
    )
  }  

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
  borderColor:'#4C7DC0',
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
  borderColor:'#4C7DC0',
  borderWidth:0.1,
},
row:{
  //color:'#EBF8E7',
  flex:1,
  flexDirection:'row',
  borderColor:'#4C7DC0',
  borderWidth:0.1,
},

cell:{
  color:'#EBF8E7',
  flex:1,
  
  borderColor:'#4C7DC0',
  borderWidth:1,
  textAlign:'center',
  textAlignVertical:'center',
  
}
 
});



