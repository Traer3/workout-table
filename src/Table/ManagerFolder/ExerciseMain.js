import { useRef, useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import ExerciseBlock from "./ExerciseBlock";
import { WorkoutDay } from "../../db/schemas";
import { useQuery } from "../../db/realm";
import ExerciseBlockIcons from "./ExerciseBlockIcons";
import ExerciseColumnHolder from "./ExerciseColumnHolder";
import { useDatabase } from "../../../DatabaseContext";



export default function ExerciseMain({ newDay, setNewDay }) {
    const { categories } = useDatabase();
    const allTemplates = useQuery('WorkoutTemplate');
    const [index , setIndex] = useState(0);

    
    const initialGrouped = categories.reduce((accumulator, category)=>{
        accumulator[category] = [];
        return accumulator;
    },{});

    const groupedTemplates = allTemplates.reduce((accumulator, template) => {
        const cat = template.category;
        if(cat && accumulator[cat]){
            accumulator[cat].push(template);
        }else{
            accumulator["Unique"].push(template);
        }

        return accumulator;
    },initialGrouped);

    function changeIndex(newName) {
        console.log("new Name: ", newName)
        setIndex(categories.indexOf(newName));
        console.log("c: ", categories.indexOf(newName))
    }


    return (
        <View style={styles.exerciseMainBody}>
            {false ? 
                <View style={{alignItems:'center'}}>
                    <ExerciseBlock categories={categories} />
                </View>
                :
                <>
                    <ExerciseBlockIcons categories={categories} specialFunction={changeIndex}/>
                    <ExerciseColumnHolder groupedTemplates={groupedTemplates} categories={categories} index={index}/>
                </>
            }


        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody: {
        //borderColor: 'red',
        borderWidth: 0.1,
        borderRadius: 5,
        height: "80%",
        margin: 5,
    },
    exerciseBody: {
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 5,
        height: "98%",
        width: "30%",
        margin: 5,
        backgroundColor: '#3D458F',
    },
});