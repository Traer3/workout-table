import { Pressable, View, StyleSheet, Text } from "react-native";
import { useDatabase } from "../../../DatabaseContext";
import { useObject } from "../../db/realm";

export default function PresetForm({ name, id, setCurretnPreset,  onDeletion }) {
    if (!name || !id) return;
    const { presetsHistory } = useDatabase()
    const currentPreset = useObject(presetsHistory, id)
    //console.log(currentPreset)

    const loadPreset = () => {
        console.log(currentPreset.exercise.map(exercis => exercis.fullName))
        //setSelectedExercises(currentPreset.exercise.map(exercis => exercis.fullName))
        setCurretnPreset(currentPreset)
    };

    const onLongPress = () => {
        onDeletion(id)
        //добавить окошко с предложением "удалить ли ? "
    }

    return (
        <View >
            <Pressable
                onPress={loadPreset}
                onLongPress={onLongPress}
                style={styles.pressableCell}>
                <Text style={styles.textStyle}>{name}</Text>
            </Pressable>

        </View>
    )
};

const styles = StyleSheet.create({
    pressableCell: {
        borderColor: '#2E346E',
        borderWidth: 2,
        borderRadius: 5,
        height: '40',
        width: '80',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },

    textStyle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '600'
    },

});
