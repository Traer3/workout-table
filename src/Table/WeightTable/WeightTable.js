import { View } from "react-native";
import { useDatabase } from "../../../DatabaseContext.js";
import { useRealm } from "../../db/realm.js";
import styles from '../RenderItem/renderItemStyles.js';
import WeightNamesBlock from "./WeightNamesBlock.js";
import WeightInfoBlock from "./WeightInfoBlock.js";

export default function WeightTable({ currentDayData, item, loading, setLoading, editingCell, setEditingCell, flatListRef, index, }) {
    const { weightHistory } = useDatabase();
    const realm = useRealm()
    const maxId = weightHistory.max('id')
    const currentWeightDayData = createDayData(currentDayData)

    function getExerciseData(exerciseName) {
        const exerciseHistory = realm
            .objects('ExerciseWeightHistory')
            .filtered('fullName == $0', `${exerciseName}`)
            .sorted('id', false);//Сортирует по возрастанию , я всегда создаю новую запись с новым id и новым весом 
        const freshElement = [exerciseHistory[exerciseHistory.length - 1]];
        return freshElement;
    }

    function createDayData(currentDayData) {
        const dayData = []
        currentDayData.exercises.map((exercise) => {
            const fullName = exercise.fullName
            const exerciseHistory = getExerciseData(fullName)
            dayData.push(...exerciseHistory)
        })
        return dayData;

    }

    return (
        <View style={[styles.table]}>
            <WeightNamesBlock currentDayData={currentWeightDayData} />
            <WeightInfoBlock
                currentDayData={currentWeightDayData}
                editingCell={editingCell}
                setEditingCell={setEditingCell}
                flatListRef={flatListRef}
                index={index}
                maxId={maxId}
            />
        </View>
    )
}

