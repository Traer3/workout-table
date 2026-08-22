import { Pressable, View, StyleSheet, Text, Image } from "react-native";
import icon from "../../../assets/add2.png"


export default function PresetForm({ presetState }) {
    return (
        <View style={[styles.presetBlock, { justifyContent: presetState ? 'center' : 'space-between' }]}>
            {presetState ?
                <Pressable style={styles.pressableCell}>
                    <Image source={icon} style={{
                        height: 25,
                        width: 25,
                    }} />
                </Pressable>
                :
                <>
                    <Pressable style={styles.pressableCell}>
                        <Text>{'$value'}</Text>
                    </Pressable>
                    <Pressable style={styles.pressableCell}>
                        <Text>{'$value'}</Text>
                    </Pressable>
                    <Pressable style={styles.pressableCell}>
                        <Text>{'$value'}</Text>
                    </Pressable>
                </>
            }

        </View>
    )
};

const styles = StyleSheet.create({
    presetBlock: {
        borderWidth: 0.1,
        height: "8%",
        borderRadius: 5,
        backgroundColor: '#3D458F',
        margin: 5,
        flexDirection: 'row',

        alignItems: 'center',
        padding: 5
    },
    pressableCell: {
        borderColor: '#2E346E',
        borderWidth: 2,
        borderRadius: 5,
        height: '50%',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',

    },
});