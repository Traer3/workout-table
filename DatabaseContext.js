import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'

export const DatabaseContext = createContext()

const STORAGE_NAME = '@workout_dataTEST';

const initTable = [ //сделать нормальную генерацию , а не эту хуйню 
    {
        "day": "25.06.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "weights": {
            "PU": { "color": "", "value": 0 },
            "RWC": { "color": "", "value": 0 },
            "WC": { "color": "", "value": 0 },
            "WSC": { "color": "", "value": 0 },
            "WP": { "color": "", "value": 0 },
            "WS": { "color": "", "value": 0 },
        }
    },
    {
        "day": "28.06.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "weights": {
            "SU": { "color": "", "value": 0 },
            "Sq": { "color": "", "value": 0 },
            "ETK": { "color": "", "value": 0 },
            "SCR": { "color": "", "value": 0 },
            "BSS": { "color": "", "value": 0 },
            "LR": { "color": "", "value": 0 },
            "EP": { "color": "", "value": 0 },
        }
    },
    {
        "day": "29.06.26",
        "BR": {
            "fullName": "Barbell Row", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 },
        },
        "weights": {
            "BR": { "color": "", "value": 0 },
        }
    },
    {
        "day": "01.07.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "weights": {
            "PU": { "color": "", "value": 0 },
            "RWC": { "color": "", "value": 0 },
            "WC": { "color": "", "value": 0 },
            "WSC": { "color": "", "value": 0 },
            "WP": { "color": "", "value": 0 },
            "WS": { "color": "", "value": 0 },
        }
    }
];
export const DatabaseProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(null);
    useEffect(() => {
        const initLoad = async () => {
            try {
                //await AsyncStorage.removeItem('@workout_data')
                //await AsyncStorage.removeItem('@workout_data22')
                const loadedData = await loadFromPhone();
                //console.log("workout_data : ",loadedData)
                setInfo(loadedData);
            } catch (err) {
                console.error(`Error while loading AsyncStorage item :${STORAGE_NAME}\n ${err}`)
            } finally {
                setLoading(false);
            }
        };
        initLoad();
    }, [])

    const loadFromPhone = async () => {
        try {
            let jsonValue
            //jsonValue = await AsyncStorage.getItem(STORAGE_NAME);
            return jsonValue != null ? JSON.parse(jsonValue) : initTable
        } catch (err) {
            console.error("Error while loading data");
        }
    }

    const saveDataToPhone = async (newData) => {
        try {
            const jsonValue = JSON.stringify(newData);
            await AsyncStorage.setItem(STORAGE_NAME, jsonValue);
            //console.log("Data saved!");
        } catch (err) {
            console.error("Error saving data: ", err);
        }
    }
    const uploadToDrive = async (jsonData) => {
        try {
            const docDir = FileSystem.Paths.document;
            const docDirUri = docDir.uri;

            const fileUri = docDirUri.endsWith('/')
                ? `${docDirUri}workout_data.json`
                : `${docDirUri}/workout_data.json`;

            const jsonString = JSON.stringify(jsonData, null, 2);

            const file = new FileSystem.File(fileUri);
            await file.write(jsonString);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri, {
                    mimeType: 'application/json',
                    dialogTitle: 'Backup save'
                });
            }

        } catch (err) {
            console.error("Error: ", err);
        }
    }

    return (
        <DatabaseContext.Provider
            value={{
                uploadToDrive,
                saveDataToPhone,
                info,
                loading
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider')
    }
    return context;
}