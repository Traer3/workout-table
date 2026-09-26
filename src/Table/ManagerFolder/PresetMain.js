import { Pressable, View, StyleSheet, Text, Image, TextInput, FlatList } from "react-native";
import icon from "../../../assets/add2.png"
import { useDatabase } from "../../../DatabaseContext";
import { useMaxId } from "../../hooks/useMaxId";
import { useRef, useState } from "react";
import ChoiceAnswer from "./ChoiceAnswer";
import PresetForm from "./PresetForm";
import { useQuery, useRealm } from "../../db/realm";


export default function PresetMain({ editDay, setEditDay, presetState, selectedExercises, assembleExercises, saveUserInput, setCurretnPreset, zeroIdSave }) {
    const { presetsHistory } = useDatabase()
    const { id: nexId } = useMaxId(presetsHistory)
    const presetName = useRef('');
    const [writeName, setWriteName] = useState(false);

    const presetsHistoryTable = useQuery(presetsHistory)
    const realm = useRealm()

    const presetsData = presetsHistoryTable.filter(preset => preset.id !== 0);

    const handlePresetCreation = () => {
        setWriteName(!writeName);
    }
    const onSave = () => {
        if (presetName.current.length > 0) {
            const exercises = assembleExercises(selectedExercises);
            saveUserInput(presetsHistory, exercises, nexId, presetName.current)
            setEditDay(!editDay)
        } else {
            console.log("write name")
        }
    }
    const onCansel = () => {
        setWriteName(false)
    };

    

    const onDeletion = (id) => {
        realm.write(() => {
           const element = realm.objectForPrimaryKey(presetsHistory,id)
                if(element){
                    realm.delete(element);
                }
        })
    };

    const renderItem = ({ item }) => {
        if (item) {
            return (
                <PresetForm
                    name={item.name}
                    id={item.id}
                    setCurretnPreset={setCurretnPreset}
                    onDeletion={onDeletion}
                    zeroIdSave={zeroIdSave}
                />
            )
        }
    }

    return (
        <View style={[styles.presetBlock]}>
            {writeName ?
                <View style={{ width: "100%", height: '100%', }}>
                    <TextInput
                        multiline={true}
                        style={styles.inputStyle}
                        placeholder="name..."
                        onChangeText={(text) => {
                            presetName.current = text;
                        }}
                    />
                    <ChoiceAnswer
                        onCansel={onCansel}
                        onSave={onSave}
                    />
                </View> :
                <>
                    <FlatList
                        style={styles.flatListConteiner}
                        contentContainerStyle={styles.flatListContet}
                        data={presetsData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        ListFooterComponentStyle={styles.pressableCell}
                        ListFooterComponent={() => (
                            <Pressable
                                //плюс всегда в конце списка или сделать его как иконка плюса в верхнем правом углу 
                                //style={styles.pressableCell}
                                onPressIn={handlePresetCreation}
                            >
                                <Image source={icon} style={{
                                    height: 25,
                                    width: 25,
                                }} />
                            </Pressable>
                        )}
                    />


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
        height: 40,
        width: 80,
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
        textAlign: 'center',
        color: 'white',
        fontWeight: '600'
    },
    inputStyle: {
        //borderColor:'yellow',
        //borderWidth:1,
        height: '50%',
        fontSize: 11,
        paddingBottom: 0,
        textAlign: 'center',
        fontWeight: '600'
    },
    flatListConteiner: {
        height: "100%",
        width: '100%',
        // borderWidth: 1,
        // borderColor: 'green',

    },
    flatListContet: {
        height: '100%',
        width: '100%',
        // borderWidth: 1,
        // borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },

});
