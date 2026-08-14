import { View } from "react-native";
import { useDatabase } from "../../../DatabaseContext.js";
import { useRealm } from "../../db/realm.js";
import DateBlock from "../RenderItem/DateBlock.js";
import styles, { BorderColor } from '../RenderItem/renderItemStyles.js';

 /*{ "fullName": "Push Ups", 
        "id": 1, 
        "timestamp": 1786545550, 
        "weightData": { "color": "", "value": 0} }, */

    //{"fullName": "Push Ups", "id": 12, "timestamp": 1786713746, "weightData": [Object]}

    /*  {"exerciseKey": "PU", 
        "fullName": "Push Ups", 
        "reps1": [Object], 
        "reps2": [Object], 
        "rest1": [Object], 
        "rest2": [Object] },  */ 

export default function WeightTable({ currentDayData, item, loading, setLoading,  editingCell, setEditingCell, flatListRef, index, }) {
    const { weightHistory } = useDatabase();
    //console.log("weightHistory: ", weightHistory)
    const realm = useRealm()
    const maxId = weightHistory.max('id')
    const currentWeightDayData = createDayData(currentDayData)
    //console.log("currentWeightDayData: ", currentWeightDayData)

    function getExerciseData(exerciseName) {
        //console.log("exerciseName: ",exerciseName)
        const exerciseHistory = realm
                .objects('ExerciseWeightHistory')
                .filtered('fullName == $0', `${exerciseName}`)
                .sorted('id',false);//Сортирует по возрастанию , я всегда создаю новую запись с новым id и новым весом 
        return exerciseHistory;
    }   

    //console.log("PU: ", getExerciseData("Push Ups"))

    function createDayData(currentDayData) {
        const dayData = []
        currentDayData.exercises.map((exercise)=>{
            //const key = exercise.exerciseKey
            const fullName = exercise.fullName
            const exerciseHistory = getExerciseData(fullName)
            dayData.push(...exerciseHistory)

            //console.log("key: ", key)
            //console.log("fullName: ", fullName)
            //console.log("exerciseHistory: ", exerciseHistory)

            return dayData;
        })
        console.log("dayData: ", dayData)
    }

    return (
            <View style={[styles.table]}>

                    {
                        /*  
                            //мне нужен ключ и полное имя 
                            я могу создать фальшивый объект 
                                currentDayData.exercises
                                 element.fullName : element.exerciseKey
                            <NamesBlock values={weightDayData} //передавать сюда активный объект от realm , значит нужно передавать id
                        />
                        */
                    }
                    {
                        /*
                        <InfoBlock 
                            currentDayData={weightHistory} //нужно currentDayData.exercises. значит мне нужно создать объект который он будет читать или 
                            //разбить InfoBlock на  InfoBlock и на InfoForm
                            dayData={weightDayData} 
                            mode={"weight"}
                            editingCell={editingCell}
                            setEditingCell={setEditingCell}
                            flatListRef={flatListRef}
                            index={index}
                            maxId={maxId}
                        /> 
                        */
                    }
            </View>

    )
}

