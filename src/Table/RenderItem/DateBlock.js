import { Pressable, TextInput,} from "react-native";
import styles from './renderItemStyles.js'


export default function DateBlock({toogleSave,saveToPhone,item}) {
    return (
        <Pressable
            style={{
                margin: '-10',
                //borderColor: 'red',
                //borderWidth: 1
            }}
            onPress={() => { console.log("Presed!") }}
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
    )
} 