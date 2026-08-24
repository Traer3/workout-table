import { View, StyleSheet, FlatList } from "react-native";
import ExerciseColumn from "./ExerciseColumn";
import { useCallback } from "react";


//Мне нужно создать ExerciseColumn и ExerciseColumFrom 

export default function ExerciseColumnHolder ({groupedTemplates, categories}) {


    const renderItem = useCallback(({ item, index }) => (
            
            <ExerciseColumn
                //specialName={item}
            />
        ));

    return(
        <View style={styles.exerciseMainBody}>
            {/*Этот FlatList будет деражать ВСЕ колонки с категориями*/}
            <FlatList 
                style={styles.flatListConteiner}
                contentContainerStyle={styles.flatListContet}
                data={categories}
                renderItem={renderItem}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
            
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody:{
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        height:'90%',
        
        margin: 5,
        //justifyContent:'center',
        //alignItems:'center'
    },
    exerciseBody: {
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 5,
        height:"98%",
        width:"30%",
        margin: 5,
        backgroundColor: '#3D458F',
    },
    flatListConteiner: {
        height: "100%",
        width: '100%',
        borderWidth: 1,
        borderColor:'yellow',
        
      },
      flatListContet: {
        justifyContent:'center',
        //alignItems:'center',
               
    },
});