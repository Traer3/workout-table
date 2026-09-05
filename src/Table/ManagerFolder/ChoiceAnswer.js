import { Pressable, View, StyleSheet, Text } from "react-native";
import { useState } from "react";



export default function ChoiceAnswer({setActiveCategory}) {
    const [active, setActive] = useState(false)
    
    const onPressOut = () => {
        setTimeout(()=>{
            setActive(false)
        },200)
    }
    return(
        <View style={styles.mainBody}>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: 'transparent', }]}
                onPressIn={()=> setActiveCategory(null)}
            >
                <Text style={[styles.buttonText,{color:'red'}]}> Cansel</Text>
            </Pressable>
            <Pressable
                style={[styles.exerciseHeader, { backgroundColor: active ? 'rgba(76, 175, 80, 0.2)' : 'transparent', }]}
                onPressIn={()=> setActive(true)}
                onPressOut={onPressOut}
            >
                <Text style={[styles.buttonText,{color:'green'}]}>Start</Text>
            </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
        flexDirection:'row',
        justifyContent:'space-between',
    },
    exerciseHeader: {
        //borderWidth:1,
        //borderColor:'blue',
        borderRadius: 5,
        height: "100%",
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText:{
        fontWeight:'600',
        fontSize:25,
    }
});