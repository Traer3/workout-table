//npx expo install @react-native-async-storage/async-storage
import { View } from "react-native";

import WorkoutTable from "./src/Table/WorkoutTable";
import { useTools } from "./StyleAssistant";


export default  function App() {
  const {YellowBorder} = useTools();

  return (
    <View style={YellowBorder}>
      <WorkoutTable/>
    </View>
  );
}
