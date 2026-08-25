import { View, StyleSheet, FlatList } from "react-native";
import ExerciseButton from "./ExerciseButton";
import { useCallback, useRef } from "react";
import ExerciseColumnForm from "./ExerciseColumnFrom";



export default function ExerciseColumn({category, templates}) {
   //console.log("category", category)
   

    const renderItem = useCallback(({ item, }) => {
        const name = item.exercise.fullName
        
        return(
        <ExerciseColumnForm
            specialName={name}
        />
    )});
    return(
            <View style={[styles.exerciseMainBody ]}>
                {/*нужно передать ему указания что бы был в блюре */}
                {false && <View style={[styles.glassOverlay]}/>}
                <FlatList 
                    
                    style={styles.flatListConteiner}
                    contentContainerStyle={styles.flatListContet}
                    data={templates[category]}
                    renderItem={renderItem}                    
                    showsVerticalScrollIndicator={false}
                    
                />
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody:{
        //borderColor: 'red',
        borderWidth: 0.1,
        borderRadius: 5,
        height:"98%",
        width:"137",//37%
        margin: 5,
        //alignItems:'center',
        backgroundColor: '#3D458F',
    },

    flatListConteiner: {
        //height: "100%",
        //width: '100%',
        borderWidth: 0.1,
        //borderColor:'green',

      },
      flatListContet: {
        //justifyContent:'center',
        //alignItems:'center',
        //flexDirection:'row',
        
    },
    glassOverlay:{
        position:'absolute',
        //borderRadius: 5,
        backgroundColor:'rgba(61, 69, 143, 0.9)',
        backfaceVisibility:'visible',
        height:"100%",
        width:'100%',
        zIndex:999
    },
});