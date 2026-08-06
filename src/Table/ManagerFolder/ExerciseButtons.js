import { Pressable, View, StyleSheet, Text } from "react-native";

export default function ExerciseButtons({ }) {
    return (
        <View style={styles.exerciseMainBody}>
            <View style={styles.exerciseBody}>
                {/*Ячейка которая будет удерживать кнопки для определенного типа тренировок*/}
                <View style={styles.exerciseCell}>
                    <Text style={styles.exerciseHeader}>LegDay</Text>
                    {/*Создать FlatList или обдумать как эта хуйня будет выглядеть нормально , если кнопок будет больше 10*/}
                    <Pressable style={styles.exerciseHeader}>
                        <Text>{'exercise.name'}</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.exerciseBody}>
                <View style={styles.exerciseCell}>
                    <Text style={styles.exerciseHeader}>LegDay</Text>
                    
                    <Pressable style={styles.exerciseHeader}>
                        <Text>{'exercise.name'}</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.exerciseBody}>
                <View style={styles.exerciseCell}>
                    <Text style={styles.exerciseHeader}>LegDay</Text>
                    <Pressable style={styles.exerciseHeader}>
                        <Text>{'exercise.name'}</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    exerciseMainBody:{
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        height:"80%",
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseBody: {
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 5,
        height:"98%",
        width:"30%",
        margin: 5,
        backgroundColor: '#3D458F',
    },
    exerciseCell: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    exerciseHeader: {
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        height: '4%',
        width: '90%',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center'
    }
});