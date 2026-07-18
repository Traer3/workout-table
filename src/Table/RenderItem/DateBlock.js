import { Pressable, TextInput, View, } from "react-native";
import styles from './renderItemStyles.js'
import {useRealm } from "../../db/realm.js";
import { useRef } from "react";

export default function DateBlock({ item, currentDayData, changeWeight, setChangeWeight, loading, setLoading }) {
    const data = useRef(item || 'no data')
    const realm = useRealm();
    //console.log("DateBlock AWAKE!: ", item)

    if (!currentDayData || !currentDayData.isValid()) {
        return null;
    }

    function changeDay(oldDayObject, newDateValue) {
        if (!oldDayObject || !oldDayObject.isValid() || oldDayObject.day === newDateValue) return;

        const oldDayKey = oldDayObject.day
        const plainObj = oldDayObject.toJSON()

        setLoading(true);

        setTimeout(() => {
            realm.write(() => {
                realm.create('WorkoutDay', {
                    ...plainObj,
                    day: newDateValue,
                }, 'modified');

                const dayToDelete = realm.objectForPrimaryKey('WorkoutDay', oldDayKey)

                if (oldDayKey && dayToDelete.isValid()) {
                    realm.delete(dayToDelete);
                    //console.log("Old day deleted!");
                }

                setTimeout(() => {
                    setLoading(false);
                    //console.log("Table loaded with new data")
                }, 50)
            })
        }, 100)
    }
    return (
        <Pressable
            style={{
                margin: '-10',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={() => {
                console.log("setChangeWeight(!changeWeight)")
            }}
        >
            <Pressable
                style={{
                    width: "40%",
                }}>
                <TextInput
                    style={[styles.textStyle]}
                    defaultValue={data.current}
                    onChangeText={(text) => {
                        data.current = text
                    }}
                    onSubmitEditing={() => { changeDay(currentDayData, data.current) }}
                />
            </Pressable>
        </Pressable>
    )
} 