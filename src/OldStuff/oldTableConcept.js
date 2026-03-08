const bigData = [{
    day: "26.02.26",
    RWC: { 
      "reps1": {
        color:"",
        value: 0,
      }, 
    },
  }];
 
  const exercise = "RWC";
  const field = "reps1";

  bigData[0][exercise][field].value = 15

  console.log(bigData[0].RWC.reps1.value)
  
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

/*
//old styles 
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

*/