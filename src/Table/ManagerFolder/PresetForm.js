import { Pressable, View, StyleSheet, Text, Image, TextInput } from "react-native";
import icon from "../../../assets/add2.png"
import { useDatabase } from "../../../DatabaseContext";
import { useMaxId } from "../../hooks/useMaxId";
import { useRef, useState } from "react";
import ChoiceAnswer from "./ChoiceAnswer";


export default function PresetForm({ editDay, setEditDay, presetState, selectedExercises, assembleExercises, saveUserInput }) {
    const { presetsHistory } = useDatabase()
    const { id: nexId } = useMaxId(presetsHistory)
    const presetName = useRef('');
    const [writeName, setWriteName] = useState(false);

    const handlePresetCreation = () => {
        setWriteName(!writeName);
    }
    const onSave = () => {
        console.log("Presed!")
        if (presetName.current.length > 0) {
            const exercises = assembleExercises(selectedExercises);
            //saveUserInput(presetsHistory, exercises, nexId) Включить позже 
            setEditDay(!editDay)
        } else {
            console.log("write name")
        }
    }
    const onCansel = () => {
        setWriteName(false)
    }


    return (
        <View style={[styles.presetBlock, { justifyContent: presetState ? 'center' : 'space-between' }]}>
            {/* Обращатся к presetsHistory и закинуть все присеты не считая id 0 как кнопки  */}
            {writeName ?
                <>
                    <View style={{
                        // borderColor: 'red',
                        // borderWidth: 1,
                        width: "100%",
                        height: '100%',

                    }}>
                        <TextInput
                            multiline={true}
                            style={{
                                //borderColor:'yellow',
                                //borderWidth:1,
                                height: '50%',
                                fontSize: 11,
                                paddingBottom: 0,
                                textAlign: 'center',
                                fontWeight: '600'
                            }}
                            placeholder="name..."
                            onChange={(text) => {
                                presetName.current = text;
                            }}
                        />
                        <ChoiceAnswer 
                            onCansel={onCansel}
                            onSave={onSave}
                        />
                    </View>
                </> :
                <>
                    <Pressable style={styles.pressableCell}>
                        <Text>{'arms'}</Text>
                    </Pressable>
                    <Pressable style={styles.pressableCell}>
                        <Text>{'legs'}</Text>
                    </Pressable>
                    <Pressable
                        //плюс всегда в конце списка или сделать его как иконка плюса в верхнем правом углу 
                        style={styles.pressableCell}
                        onPressIn={handlePresetCreation}
                    >
                        <Image source={icon} style={{
                            height: 25,
                            width: 25,
                        }} />
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
        //padding: 5
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
    exerciseCell: {
        borderColor: '#2E346E',
        borderWidth: 0.2,
        borderRadius: 5,
        margin: 5,
        //backgroundColor:'yellow',
        width: '20%',


    },
    textStyle: {
        textAlign:'center',
        //color: 'white', 
        fontWeight: '600'
    }
});
