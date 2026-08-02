import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Sharing from 'expo-sharing'
import { useQuery, useRealm,  } from "./src/db/realm";
import { Directory, File } from "expo-file-system";
//import RNFS from 'react-native-fs'

export const DatabaseContext = createContext()

const STORAGE_NAME = '@workout_dataTEST';


export const DatabaseProvider = ({ children }) => {
    const realm = useRealm();
    const saveDemoWorkout = () => {
        realm.write(() => {
            realm.create('WorkoutDay', {
                day: '30.05.26',
                PU: { fullName: 'Push Ups', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                RWC: { fullName: 'Reverse Wrist Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WC: { fullName: 'Wrist Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WSC: { fullName: 'Wrist Side Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WP: { fullName: 'Wrist Pronation', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WS: { fullName: 'Wrist Suplination', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
            }, 'modified');
            realm.create('WorkoutDay', {
                day: '01.06.26',
                SU: { fullName: 'Sit-Ups', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                ETK: { fullName: 'Squats', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                SCR: { fullName: 'Elbow To Knee', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                BSS: { fullName: 'Bulgarian Slit Squats', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                LR: { fullName: 'Leg Raises', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                EP: { fullName: 'Elbow Plank', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
            }, 'modified');
        
            realm.create('WorkoutDay', {
                day: '02.06.26',
                BR: { fullName: 'Barbell Row', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
            }, 'modified');

           
            realm.create('WorkoutDay', {
                day: '04.06.26',
                PU: { fullName: 'Push Ups', reps1: { color: 'green', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                RWC: { fullName: 'Reverse Wrist Curl', reps1: { color: 'green', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WC: { fullName: 'Wrist Curl', reps1: { color: 'green', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WSC: { fullName: 'Wrist Side Curl', reps1: { color: 'green', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WP: { fullName: 'Wrist Pronation', reps1: { color: 'green', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                WS: { fullName: 'Wrist Suplination', reps1: { color: 'green', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
            }, 'modified');
            
            /*
            realm.create('ExerciseWeightHistory', {
                id: 0 ,
                day: '19.03.26',
                timestamp: Math.floor(Date.now() / 1000),
                fullName: 'Wrist Pronation',
                weightData: {
                    color: "green", 
                    value: 7.5 
                }
                
            }, 'modified');

                const deletee = realm.objectForPrimaryKey('ExerciseWeightHistory', 0)
                realm.delete(deletee);
            */
        });
        console.log("Data successfully saved! ");
    };


    const [loading, setLoading] = useState(true);
    
    const workoutTable = useQuery('WorkoutDay')
    const weightHistory = useQuery('ExerciseWeightHistory')
    
    useEffect(()=>{
        //saveDemoWorkout()
    },[])



    const uploadToDrive = async () => {
            //console.log("uploadToDrive WORKED!")
        const realmDB = realm.path
        const oldRealmDB = realmDB.replace('default.realm', 'backup.realm');
            console.log("realmDB: ", realmDB)
            console.log("oldRealmDB: ", oldRealmDB)
        
        try{
            console.log("Trying new File")
            const backupFile = new File({parentDirectory:oldRealmDB})
            console.log("backupFile: ", backupFile)
            if(backupFile.exists){
                console.log("File exist! ")
            }
        }catch(err){
            console.log("Error: ", err)
        }
        
        return;
        const backupPath = realm.path.replace('default.realm', 'backup.realm');

        console.log("backupPath: ", backupPath,"\n");
        
        try{
            realm.writeCopyTo({path: backupPath});
            console.log("Backup created in: ", backupPath)
        }catch(err){
            console.error(`Error while creating backup!`, err);
        }
        //const backupPath = `${}`
        /*
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
            */
    }

    function getFormattedDate() {
        return new Date().toLocaleDateString('ru-RU',{
            day:'2-digit',
            month:'2-digit',
            year:'2-digit'
        });
    }

    function checkHours(hours, lastCheck) {
        if(!lastCheck){
            console.log("checkHours need lastCheck: ",lastCheck)
            return null;
        };
        
        const lastCheckData = typeof lastCheck === 'number'
            ? new Date(lastCheck * 1000)
            : new Date(lastCheck);

        const now = new Date();
        const diffMs = now.getTime() - lastCheckData.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if(diffHours >= hours){
            //console.log(`🕘 More than ${hours} hours have passed,  it's time to check  `);
            return true
        }else{
            //console.log(`It's still early! It's only been ${diffHours.toFixed(1)} hours.`);
            return false
        }
    }
    

    return (
        <DatabaseContext.Provider
            value={{
                uploadToDrive,
                workoutTable,
                weightHistory,
                loading,
                setLoading,
                getFormattedDate,
                checkHours
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