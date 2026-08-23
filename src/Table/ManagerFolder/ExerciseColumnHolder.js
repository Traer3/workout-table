import { View, StyleSheet } from "react-native";
import ExerciseColumn from "./ExerciseColumn";




export default function ExerciseColumnHolder ({}) {
    return(
        <View style={styles.exerciseMainBody}>
            {/*Надо будет ебануть FlatList который будет горизонтально держать эти колонки */}
            <ExerciseColumn/>
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
        justifyContent:'center',
        alignItems:'center'
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