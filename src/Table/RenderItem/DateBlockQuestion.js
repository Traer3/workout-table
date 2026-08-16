import { Pressable, StyleSheet, Text, View } from "react-native";

export default function DateBlockQuestion({ specialFunction, setQuestion, question }) {
    return (
        <View style={styles.mainBody}>
            <Text style={[styles.textStyle, { color: 'white' }]}>
                set today date ?
            </Text>
            <View style={styles.buttonHolder}>
                <Pressable style={[styles.pressableStyle, { marginRight: 50 }]}
                    onPress={() => specialFunction()}
                >
                    <Text style={[styles.textStyle, { color: 'green' }]}>
                        Yes
                    </Text>
                </Pressable>
                <Pressable style={[styles.pressableStyle]}
                    onPress={() => setQuestion(!question)}
                >
                    <Text style={[styles.textStyle, { color: 'red' }]}>
                        No
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
        alignItems: 'center',
        height: 80
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonHolder: {
        alignItems: 'center',
        flexDirection: "row",
    },
    pressableStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
    }
})