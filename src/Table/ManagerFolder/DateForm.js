import { StyleSheet, Text, View } from "react-native"
import { useDatabase } from "../../../DatabaseContext";
import { useEffect, useState } from "react";


export default function DateForm({ newDay, setNewDay }) {
    const {getFormattedDate} = useDatabase()
    const [date, setDate] = useState(0 || getFormattedDate());
    
    //заменить useEffect на считывание кнопки согласия или другого определителя завершения проверки дня 
    useEffect(()=>{
        console.log("date", date)
        setNewDay({'day': date})
    },[date])
    
    return (
        < View style={styles.dateBlock} >
            <Text>{date}</Text>
        </View >
    )
};

const styles = StyleSheet.create({
    dateBlock: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        height: '8%',
        backgroundColor: '#3D458F',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
});