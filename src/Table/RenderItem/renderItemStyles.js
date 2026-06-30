import {StyleSheet} from "react-native";

export const BorderColor = "#4C7DC0";
export const TextColor = '#EBF8E7';

export default StyleSheet.create({
    textStyle: {
        color: TextColor,
        fontWeight: 800,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    conteiner: {
        height: "100%",
        width: '100%',
        borderWidth: 0.1,
        marginTop: 40,
    },
    table: {
        borderContent: 'none',
        borderColor: BorderColor,

        flexDirection: 'row',
        minHeight:50,
        //height:250,
        width: "100%",
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',


    },
    rowName: {
        flex: 0.5,
        flexDirection: 'column',
        borderColor: BorderColor,
        borderWidth: 0.1,
    },
    row: {
        //color:'#EBF8E7',
        flex: 1,
        flexDirection: 'row',
        borderColor: BorderColor,
        borderWidth: 0.1,
    },

    cell: {
        flex: 1,
        height:50,
        borderColor: BorderColor,
        borderWidth: 1,

    },
    pressableCell: {
        flex: 1,
        borderColor: BorderColor,
        borderWidth: 0.1,
    },

    input: {
        backgroundColor: 'rgba(76,125,192,0.2)',
        color: '#fff',
    },
    coloredBox: {
        zIndex: 999,
        height: 60,
        width: 60,
        elevation: 5,

    }
})