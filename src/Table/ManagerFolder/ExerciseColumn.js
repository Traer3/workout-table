import { View, StyleSheet, FlatList } from "react-native";
import ExerciseButton from "./ExerciseButton";
import { useCallback } from "react";
import ExerciseColumnForm from "./ExerciseColumnFrom";



export default function ExerciseColumn({category, templates}) {
    const renderItem = useCallback(({ item, index }) => (
            
        <ExerciseColumnForm
            specialName={item}
        />
    ));
    
    return(
            <View style={[styles.exerciseMainBody ]}>
                 {/*Эта хуйня будет создавать FlatList и используя форму отображать формы ExerciseColumnForm */}
                <FlatList 
                    style={styles.flatListConteiner}
                    contentContainerStyle={styles.flatListContet}
                    data={["template","kys","mega kys","kysiti","template1","kys1","mega kys1","kysiti1",]}
                    renderItem={renderItem}
                    
                    scrollEnabled={true}
                    //showsVerticalScrollIndicator={false}
                />
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody:{
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 5,
        height:"95%",
        width:"137",//37%
        margin: 5,
        //alignItems:'center',
        backgroundColor: '#3D458F',
    },

    flatListConteiner: {
        //height: "100%",
        //width: '100%',
        borderWidth: 1,
        borderColor:'green',

      },
      flatListContet: {
        //justifyContent:'center',
        //alignItems:'center',
        //flexDirection:'column'
    },
});