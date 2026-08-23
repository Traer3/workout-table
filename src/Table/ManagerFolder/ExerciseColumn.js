import { View, StyleSheet } from "react-native";
import ExerciseButton from "./ExerciseButton";



export default function ExerciseColumn({}) {
    return(
        
            <View style={[styles.exerciseMainBody ]}>
                {true && <View style={[styles.glassOverlay]}/>}
                {/*Эта хуйня будет ВСЕГДА в блюре, только по указу можно убрать блюр*/}
                <View style={{
                    alignItems:'center'
                }}>
                    <ExerciseButton specialName={'kys'}/>
                </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody:{
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        height:"95%",
        width:"37%",
        margin: 5,
        alignItems:'center',
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
    exerciseBody: {
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 5,
        height:"98%",
        width:"30%",
        margin: 5,
        backgroundColor: '#3D458F',
    },
});