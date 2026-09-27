import { Pressable, View, StyleSheet, Text } from "react-native";
import { useDatabase } from "../../../DatabaseContext";
import { useObject } from "../../db/realm";

export default function PresetForm({ name, id, setCurretnPreset, onDeletion, zeroIdSave, curretnPreset }) {
    if (!name || !id) return;
    const { presetsHistory } = useDatabase()
    const currentPreset = useObject(presetsHistory, id)

    const loadPreset = () => {
        setCurretnPreset(currentPreset)
        zeroIdSave(currentPreset.exercises);

        console.log("currentPreset loadPreset: ", currentPreset )
    };

    const onLongPress = () => {
        onDeletion(id)
    }

    return (
        <View >
            <Pressable
                onPress={loadPreset}
                onLongPress={onLongPress}
                style={[styles.pressableCell, { backgroundColor: curretnPreset?.id === id ? 'rgba(76, 175, 80, 0.2)' : 'transparent', }]}>
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
