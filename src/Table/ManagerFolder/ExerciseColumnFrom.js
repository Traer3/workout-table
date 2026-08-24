import { View, StyleSheet } from "react-native";
import ExerciseButton from "./ExerciseButton";



export default function ExerciseColumnForm({specialName}) {
    return(
        
            <View style={[styles.exerciseMainBody ]}>
                {/*Эта хуйня будет ВСЕГДА в блюре, только по указу можно убрать блюр*/}
                {false && <View style={[styles.glassOverlay]}/>}
                <View style={{ alignItems:'center'}}>
                    <ExerciseButton specialName={specialName}/>
                </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody:{
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        height:"35%",
        minWidth:'130',//37%
        //margin: 5,
        
        //alignItems:'center',
        backgroundColor: '#3D458F',
    },
    glassOverlay:{
        position:'absolute',
        borderRadius: 5,
        backgroundColor:'rgba(61, 69, 143, 0.9)',
        backfaceVisibility:'visible',
        height:"100%",
        width:'100%',
        zIndex:999
    },
});