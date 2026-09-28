import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Realm } from "realm";

import * as Sharing from 'expo-sharing'
import { useQuery, useRealm, } from "./src/db/realm";
import { Directory, File } from "expo-file-system";
//import RNFS from 'react-native-fs'

export const DatabaseContext = createContext()

export const DatabaseProvider = ({ children }) => {
    const realm = useRealm();
    const [loading, setLoading] = useState(true);

    const categories = ["Neck", "Deltoids", "Chest", "Back", "Arms", "Forearms", "Core", "Glutes", "Thighs", "Calves", "Unique"];

    const workoutTable = 'WorkoutDay'
    const weightHistory = 'ExerciseWeightHistory'
    const presetsHistory = 'PresetsHistory'
    const workoutTemplate = 'WorkoutTemplate'

    const deleteAllIds = () => {
        realm.write(() => {
            for (let i = 0; i < 100; i++) {
                console.log("Index: ", i);
                const element = realm.objectForPrimaryKey("WorkoutDay", i)
                if (element) {
                    realm.delete(element);
                }
            }
            console.log("Elements deleted!")
        })
    }

    const initialTemplate = () => {
        const createEx = (category, name) => ({
            category: category,
            fullName: name,
            reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 },
            reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
        });

        realm.write(() => {
            const currentDate = Math.floor(Date.now() / 1000)
            realm.create(workoutTemplate, { id: 0, timestamp: currentDate, exercise: createEx('Forearms', 'Reverse Wrist Curl') }, 'modified');
            realm.create(workoutTemplate, { id: 1, timestamp: currentDate, exercise: createEx('Arms', 'Barbell Curl') }, 'modified');
            realm.create(workoutTemplate, { id: 2, timestamp: currentDate, exercise: createEx('Core', 'Sit Ups') }, 'modified');
            realm.create(workoutTemplate, { id: 3, timestamp: currentDate, exercise: createEx('Back', 'Barbell Row') }, 'modified');
            realm.create(workoutTemplate, { id: 4, timestamp: currentDate, exercise: createEx('Thighs', 'Squats') }, 'modified');
            realm.create(workoutTemplate, { id: 5, timestamp: currentDate, exercise: createEx('Deltoids', 'Lateral Raise') }, 'modified');
            realm.create(workoutTemplate, { id: 6, timestamp: currentDate, exercise: createEx('Glutes', 'Sled 45° Leg Press') }, 'modified');
            realm.create(workoutTemplate, { id: 7, timestamp: currentDate, exercise: createEx('Chest', 'Bench Press') }, 'modified');
            realm.create(workoutTemplate, { id: 8, timestamp: currentDate, exercise: createEx('Unique', 'Rice Bucket') }, 'modified');
        })
    }

    const uploadToDrive = async () => {
        //console.log("uploadToDrive WORKED!")
        const backupUri = realm.path.replace('default.realm', 'backup.realm');
        const formattedUri = backupUri.startsWith('file://') ? backupUri : `file://${backupUri}`;
        const backupFile = new File(formattedUri);
        try {
            if (backupFile.exists) {
                backupFile.delete();
                console.log("Old backup deleted!")
            }
            realm.writeCopyTo({ path: backupUri });
            console.log("Backup created")

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(formattedUri, {
                    mimeType: 'application/json',
                    dialogTitle: 'Backup save'
                });
            }
        } catch (err) {
            console.log("Error: ", err)
        }
        return;
    }

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    })
    function getFormattedDate(ts) {
        const date = (ts !== undefined && ts !== null)
            ? new Date(ts * 1000)
            : new Date();
        return dateFormatter.format(date)
    }

    function checkHours(hours, lastCheck) {
        if (!lastCheck) {
            console.log("checkHours need lastCheck: ", lastCheck)
            return null;
        };

        const lastCheckData = typeof lastCheck === 'number'
            ? new Date(lastCheck * 1000)
            : new Date(lastCheck);

        const now = new Date();
        const diffMs = now.getTime() - lastCheckData.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours >= hours) {
            //console.log(`🕘 More than ${hours} hours have passed,  it's time to check  `);
            return true
        } else {
            //console.log(`It's still early! It's only been ${diffHours.toFixed(1)} hours.`);
            return false
        }
    };

    function getCurrentDate() {
        const currentDate = Math.floor(Date.now() / 1000)
        return currentDate
    }

    const deletItem = (id, tableName) => {
        // if (curretnWorkout && curretnWorkout.id === id) {
        //     setCurretnPreset(null)
        // }
        setTimeout(() => {
            realm.write(() => {
                const element = realm.objectForPrimaryKey(tableName, id)
                if (element) {
                    realm.delete(element);
                }
            })
        }, 100)
    };


    return (
        <DatabaseContext.Provider
            value={{
                uploadToDrive,
                workoutTable,
                weightHistory,
                presetsHistory,
                loading,
                setLoading,
                getFormattedDate,
                checkHours,
                categories,
                workoutTemplate,
                getCurrentDate,
                deletItem,
                initialTemplate
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
