import { Pressable, StyleSheet, Text, View } from "react-native";

export default function DateBlockQuestion({ specialFunction, setQuestion, question, text }) {
    return (
        <View style={styles.mainBody}>
            <Text style={[styles.textStyle, { color: 'white' }]}>
                {text}
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
        height: 80,

    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign:'center'
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