import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'

export const DatabaseContext = createContext()

const STORAGE_NAME = '@workout_dataTEST';

const initTable = [ //сделать нормальную генерацию , а не эту хуйню 
        {
          "day": "25.06.26",
          "PU": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "RWC": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "WC": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "WSC": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "WP": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "WS": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } }
        },
        {
          "day": "28.06.26",
          "SU": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "Sq": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "ETK": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "SCR": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "BSS": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "LR": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "EP": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } }
        },
        {
          "day": "29.06.26",
          "BR": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } }
        },
        {
          "day": "01.07.26",
          "PU": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "RWC": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "WC": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "WSC": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "WP": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
          "WS": { "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } }
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

    return(
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
    if(!context){
        throw new Error('useDatabase must be used within a DatabaseProvider')
    }
    return context;
}