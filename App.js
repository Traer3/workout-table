//npx expo install @react-native-async-storage/async-storage
//npx expo install expo-sharing expo-file-system
import { View } from "react-native";

import WorkoutTable from "./src/Table/WorkoutTable";
import { useTools } from "./StyleAssistant";
import { useState } from "react";
import ManageWorkout from "./src/Table/ManageWorkout";


export default function App() {
  const { backgroundColor } = useTools();
  const [editDay, setEditDay] = useState(false);

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: backgroundColor }}> 
          
        
        {editDay ? 
          <ManageWorkout/> : 
          <WorkoutTable editDay={editDay} setEditDay={setEditDay}/> 
        }
    </View>
  );
}
