//npx expo install @react-native-async-storage/async-storage
//npx expo install expo-sharing expo-file-system
import { View } from "react-native";

import WorkoutTable from "./src/Table/WorkoutTable";
import { useDatabase } from "./DatabaseContext";
import { useTools } from "./StyleAssistant";


export default function App() {
  const {loading} = useDatabase()
  const { backgroundColor } = useTools();

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: backgroundColor }}>
      {!loading && <WorkoutTable />}
    </View>
  );
}
