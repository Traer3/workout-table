
import { Pressable, View, StyleSheet, Text,Image } from "react-native";
import icon from "../../assets/add2.png"
import { useState } from "react";



export default function ManageWorkout({ editDay, setEditDay }) {
    const [presetState, setPresetState] = useState(true)
    return (
        <View style={styles.main}>
            <Pressable
                style={styles.outward}
                onPressIn={() => setEditDay(!editDay)}
            >
                <View style={styles.mainBody}>
                    {/*Отдельная форма даты*/}
                    <View style={styles.dateBlock}>
                        <Text>Date</Text>
                    </View>

                    {/*Отдельная форма пресетов*/}
                    <View style={[styles.presetBlock, {justifyContent: presetState ? 'center' : 'space-between'}]}>
                        {presetState ? 
                        <Pressable style={styles.pressableCell}>
                            <Image source={icon} style={{
                                height: 50,
                                width: 50,
                            }}/>
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
                    {/*Отдельная форма кнопок треши*/}

                </View>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        borderColor: 'red',
        borderWidth: 1,
        height: '100%',
        
    },
    outward: {
        //borderColor:'yellow',
        //borderWidth:1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBody: {
        borderColor: 'green',
        borderWidth: 1,
        height: '93%',
        width: '90%'
    },
    dateBlock: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        height: '8%',
        backgroundColor: '#3D458F',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    presetBlock: {
        borderWidth: 1,
        height: "12%",
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
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        
    }
});