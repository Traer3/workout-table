import { View } from "react-native"
import InfoBlock from "./InfoBlock"
import { useDatabase } from "../../../DatabaseContext"
import { useRealm } from "../../db/realm";



export default function WeightTable ({exerciseKeys}) {

    //Получаю ключи exerciseKeys ["PU", "WC", "WS"]    //надо получать полные имена 
    //Прохожусь по всему weightHistory и выбираю только самые актуальные значение к эти ключам 
    //собираю эти  [
    // {"day": "09.07.26", "exerciseName": "Wrist Suplination", "id": 0, "timestamp": 1784491176, "weightValue": 7.5},
    // {"day": "10.05.26", "exerciseName": "Wrist Pronation", "id": 1, "timestamp": 1784493003, "weightValue": 10}, 
    // {"day": "11.05.26", "exerciseName": "Wrist Pronation", "id": 2, "timestamp": 1784493646, "weightValue": 1}, 
    // {"day": "15.05.26", "exerciseName": "Wrist Pronation", "id": 3, "timestamp": 1784493669, "weightValue": 15}, 
    // {"day": "15.05.26", "exerciseName": "Wrist Pronation", "id": 4, "timestamp": 1784493685, "weightValue": 20}]
    const {weightHistory} = useDatabase();
    //console.log("weightHistory: ", weightHistory)
    const realm = useRealm();
    /*
    realm.write(()=>{
        const maxId = weightHistory.max('id')
        const nextId = maxId ? maxId + 1:1;
        //console.log("maxId: ", maxId)
        realm.create('ExerciseWeightHistory',{
            id: nextId,
            exerciseName: 'Wrist Pronation',
            weightValue: 10,
            day: '10.05.26',
            timestamp: Math.floor(Date.now() / 1000),
        })
        
    })
    */
    
    
    return(
        <View>
            
        </View>
    )
}

