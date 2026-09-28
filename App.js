import { View } from "react-native";

import WorkoutTable from "./src/Table/WorkoutTable";
import { useTools } from "./StyleAssistant";
import { useEffect, useState } from "react";
import ManageWorkout from "./src/Table/ManageWorkout";
import { useDatabase } from "./DatabaseContext";
import { useQuery } from "./src/db/realm";

export default function App() {
  const { backgroundColor } = useTools();
  const [editDay, setEditDay] = useState(false);
  const { workoutTemplate, initialTemplate } = useDatabase();
  const workoutTemplateData = useQuery(workoutTemplate);

  useEffect(() => {
    if (!workoutTemplateData || workoutTemplateData.length <= 0) {
      initialTemplate();
    }
  }, [])

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: backgroundColor }}>

      {editDay ?
        <ManageWorkout editDay={editDay} setEditDay={setEditDay} /> :

        /*нужно переработать WorkoutTable,
         1. Нормально реализовать key 
         2. Исправить проблемы с прототипным наследованием 
         3. доделать таблицу с весом ) 
        */
        <WorkoutTable editDay={editDay} setEditDay={setEditDay} />

      }
    </View>
  );
}
