import { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";

 //PU: { fullName: 'Push Ups', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
export default function ExerciseButtons({ newDay, setNewDay }) {
    const [color, setColor] = useState(false)
    
    function writeUserChoice() {
        setColor(!color);
       
        setNewDay(prev => ({
            ...prev,
            PU: { 
                fullName: 'Push Ups', 
                reps1: { color: '', value: 0 }, 
                rest1: { color: '', value: 0 }, 
                reps2: { color: '', value: 0 }, 
                rest2: { color: '', value: 0 } 
            },
        }
    ))
    return;
    }

    return (
        <View style={styles.exerciseMainBody}>
            <View style={styles.exerciseBody}>
                {/*Ячейка которая будет удерживать кнопки для определенного типа тренировок*/}
                <View style={styles.exerciseCell}>
                    <Text style={styles.exerciseHeader}>Arms</Text>
                    {/*Создать FlatList или обдумать как эта хуйня будет выглядеть нормально , если кнопок будет больше 10*/}
                    <Pressable style={[styles.exerciseHeader, {backgroundColor: color ? 'rgba(76, 175, 80, 0.2)' : ''}]} onPressIn={()=>{writeUserChoice()}}>
                        <Text>{'PU'}</Text>
                    </Pressable>
                </View>
            </View>

            

        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody:{
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        height:"80%",
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    exerciseCell: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    exerciseHeader: {
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        height: '4%',
        width: '90%',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
        
    }
});