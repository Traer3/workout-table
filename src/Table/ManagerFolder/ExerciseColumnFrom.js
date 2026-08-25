import { View, StyleSheet } from "react-native";
import ExerciseButton from "./ExerciseButton";



export default function ExerciseColumnForm({specialName}) {
    return(
        
            <View style={[styles.exerciseMainBody ]}>
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
        height:"70",
        minWidth:'130',//37%
        //margin: 5,
        justifyContent:'center',
        backgroundColor: '#3D458F',
        marginBottom:5
    },
});