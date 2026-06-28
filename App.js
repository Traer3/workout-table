//npx expo install @react-native-async-storage/async-storage
//npx expo install expo-sharing expo-file-system
import { View } from "react-native";

import WorkoutTable from "./src/Table/WorkoutTable";
import { useDatabase } from "./DatabaseContext";


export default function App() {
  const {loading} = useDatabase()

  return (
    <View >
      {!loading && <WorkoutTable />}
    </View>
  );
}
