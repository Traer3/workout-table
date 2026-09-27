import { Pressable, View, StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function ChoiceAnswer({ onSave, onCansel, greenButtonText, redButtonText, thirdButton, onSpecial, fontSize }) {
    const [active, setActive] = useState(false)

    const onPressIn = () => {
        setActive(true)
        onSave()
    }

    const onClose = () => {
        onCansel()
    }

    const onPressOut = () => {
        setTimeout(() => {
            setActive(false)
        }, 200)

    }
    return (
        <View style={styles.mainBody}>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: 'transparent', }]}
                onPress={onClose}
            >
                <Text
                    style={[styles.buttonText, { color: 'red', fontSize: fontSize ? fontSize : 20 }]}
                >
                    {redButtonText ? redButtonText : "Cansel"}
                </Text>
            </Pressable>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: active ? 'rgba(76, 175, 80, 0.2)' : 'transparent', }]}
                onPress={onPressIn}
                onPressOut={onPressOut}
            >
                <Text
                    style={[styles.buttonText, { color: 'green', fontSize: fontSize ? fontSize : 20 }]}
                >
                    {greenButtonText ? greenButtonText : "Start"}
                </Text>
            </Pressable>
            {thirdButton &&
                <Pressable
                    style={[styles.exerciseHeader, { backgroundColor: 'transparent', }]}
                    onPress={onSpecial}
                    onPressOut={onPressOut}
                >
                    <Text
                        style={[styles.buttonText, { color: 'yellow', fontSize: fontSize ? fontSize : 20 }]}
                    >
                        {thirdButton}
                    </Text>
                </Pressable>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
        marginTop: 5,
        // borderColor: 'red',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 27
    },
    exerciseHeader: {
        // borderWidth: 1,
        // borderColor: 'blue',
        borderRadius: 5,
        //height: "50%",
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontWeight: '600',

    }
});