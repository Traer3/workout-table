import { Pressable, Text, } from "react-native";
import styles from './renderItemStyles.js'
import { useRealm } from "../../db/realm.js";
import { useState } from "react";
import { useDatabase } from "../../../DatabaseContext.js";
import DateBlockQuestion from "./DateBlockQuestion.js";

export default function DateBlock({ currentDayData, setLoading, loading }) {
    //console.log("currentDayData?.timestamp: ", currentDayData?.timestamp)
    const { getFormattedDate } = useDatabase()
    const realm = useRealm();
    const [date, setDate] = useState(() => getFormattedDate(currentDayData?.timestamp))
    const [question, setQuestion] = useState(false);

    if (!currentDayData || !currentDayData.isValid()) return null;

    function changeDay() {
        const todayString = getFormattedDate();
        const currentTimestamp = Math.floor(Date.now() / 1000)
        if (date !== todayString) {
            realm.write(() => {
                if (currentDayData.timestamp && currentTimestamp) {
                    currentDayData.timestamp = currentTimestamp || 0;
                }
            })
            setDate(getFormattedDate(currentTimestamp))
        }
        setQuestion(!question)
        return;
    }
    return (
        <>
            {question ?
                <DateBlockQuestion specialFunction={changeDay} setQuestion={setQuestion} question={question} /> :
                <Pressable
                    style={{ justifyContent: 'center', alignItems: 'center', }}
                    onPressIn={() => { 
                        //setLoading(!loading) 
                    }}
                >
                    <Pressable
                        style={{ width: "40%", }}
                        onPressIn={() => setQuestion(!question)}
                    >
                        <Text style={[styles.textStyle,]}
                        >{date}
                        </Text>
                    </Pressable>
                </Pressable>
            }
        </>
    )
}