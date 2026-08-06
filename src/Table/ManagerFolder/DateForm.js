import { StyleSheet, Text, View } from "react-native"


export default function DateForm({ date }) {
    return (
        < View style={styles.dateBlock} >
            <Text>Date</Text>
        </View >
    )
};

const styles = StyleSheet.create({
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
});