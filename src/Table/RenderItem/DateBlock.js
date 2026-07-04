import { Pressable, TextInput, } from "react-native";
import styles from './renderItemStyles.js'


export default function DateBlock({ item, changeWeight, setChangeWeight, toogleSave, saveToPhone, }) {
    return (
        <Pressable
            style={{
                margin: '-10',
                //borderColor: 'red',
                //borderWidth: 1
                //backgroundColor:'red',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={() => { setChangeWeight(!changeWeight) }}
        >
            <Pressable
                style={{
                    width: "40%",
                }}
            >
                <TextInput
                    style={[styles.textStyle]}
                    onChangeText={(text) => {
                        item.day = text; // мутабельная срань , потом поменяю ^_^
                    }
                    }
                    onSubmitEditing={() => { toogleSave() }}
                    onEndEditing={() => { saveToPhone() }}
                >
                    {item.day}
                </TextInput>
            </Pressable>

        </Pressable>
    )
} 