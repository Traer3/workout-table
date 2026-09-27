import { Pressable, StyleSheet, Text, View } from "react-native"
import { useDatabase } from "../../../DatabaseContext";
import { useEffect, useState } from "react";


export default function DateForm({ newDay, setNewDay, zeroIdSave }) {
    const { getFormattedDate } = useDatabase()
    const [date, setDate] = useState(0 || getFormattedDate());

    //заменить useEffect на считывание кнопки согласия или другого определителя завершения проверки дня 
    // useEffect(() => {
    //     //console.log("date", date)
    //     setNewDay({ 'day': date })
    // }, [date])

    return (
        <Pressable
            style={styles.dateBlock}
        //onPress={()=> zeroIdSave()}
        >
            < View  >
                <Text style={{
                    fontWeight: '600',
                    fontSize: 15,
                    color: 'white'
                }}>{date}</Text>
            </View >
        </Pressable>
    )
};

const styles = StyleSheet.create({
    dateBlock: {
        borderColor: 'blue',
        borderWidth: 0.1, //0.1
        borderRadius: 5,
        height: '4%',
        backgroundColor: '#3D458F',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'green'

    },
});