import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Realm } from "realm";

import * as Sharing from 'expo-sharing'
import { useQuery, useRealm,  } from "./src/db/realm";
import { Directory, File } from "expo-file-system";
//import RNFS from 'react-native-fs'

export const DatabaseContext = createContext()

export const DatabaseProvider = ({ children }) => {
    const realm = useRealm();
    const categories = ["Neck", "Deltoids", "Chest", "Back", "Arms" , "Forearms", "Core", "Glutes", "Thighs", "Calves", "Unique"];

    const [loading, setLoading] = useState(true);
    
    const workoutTable = useQuery('WorkoutDay')
    const weightHistory = useQuery('ExerciseWeightHistory')
    
    useEffect(()=>{
        //deleteAllIds()
        if(!workoutTable || workoutTable.length === 0){
            saveDemoWorkout()
        }
        
    },[])

    const deleteAllIds = () =>{
        realm.write(()=>{
            for (let i = 0; i < 100; i++) {
                console.log("Index: ", i);
                const element = realm.objectForPrimaryKey("WorkoutDay",i)
                if(element){
                    realm.delete(element);
                }
            }
            console.log("Elements deleted!")
        })
    }

    const saveDemoWorkout = () => {
        let currentTimestamp = Math.floor(new Date('2026-09-01T00:00:00Z').getTime()/ 1000);
        const ONE_DAY = 86400;

        const templates = {
            arms:[
                { exerciseKey: 'LBTE', fullName: 'Lying Barbell Triceps Extension', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'RWC', fullName: 'Reverse Wrist Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'WC', fullName: 'Wrist Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'WSC', fullName: 'Wrist Side Curl', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'WP', fullName: 'Wrist Pronation', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'WS', fullName: 'Wrist Suplination', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
            ],
            legsAndAbs:[
                { exerciseKey: 'RD', fullName: 'Romanian Deadlift', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'SU', fullName: 'Sit-Ups', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'Sq', fullName: 'Squats', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'ETK', fullName: 'Elbow To Knee', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'BSS', fullName: 'Bulgarian Split Squats', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'LR', fullName: 'Leg Raises', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'SCR', fullName: 'Standing Calf Raise', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'RT', fullName: 'Russian Twist', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
            ],
            upperBody:[
                { exerciseKey: 'BOR', fullName: 'Bent Over Row', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                { exerciseKey: 'BP', fullName: 'Bench Press', reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
            ],
        };

        const schedulePattern = [
            {template: templates.arms, restDaysAfter: 3},
            {template: templates.legsAndAbs, restDaysAfter: 1},
            {template: templates.upperBody, restDaysAfter: 2},
            {template: templates.arms, restDaysAfter: 3},
        ];

        realm.write(()=>{
            for (let i = 0; i < 30; i++) {
                const step = schedulePattern[i % schedulePattern.length];

                realm.create('WorkoutDay',{
                    id:i,
                    timestamp: currentTimestamp,
                    exercises: step.template,
                },'modified');

                currentTimestamp += step.restDaysAfter * ONE_DAY;
            }
        });
        console.log("\n","MY BODY IS A MACHINE","\n","FOR NOW")
    } 

    //old NEW
    /*
    const saveDemoWorkout = () => {
        realm.write(() => {
            const currentDate = Math.floor(Date.now() / 1000) 
            realm.create('WorkoutDay', {
                id:0,
                timestamp: currentDate,
                exercises:[{
                    exerciseKey: 'LBTE',
                    fullName: 'Lying Barbell Triceps Extension',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'RWC',
                    fullName: 'Reverse Wrist Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'WC',
                    fullName: 'Wrist Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'WSC',
                    fullName: 'Wrist Side Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'WP',
                    fullName: 'Wrist Pronation',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'WS',
                    fullName: 'Wrist Suplination',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },]
            }, 'modified');

            realm.create('WorkoutDay', {
                id:1,
                timestamp: currentDate,
                exercises:[{
                    exerciseKey: 'RD',
                    fullName: 'Romanian Deadlift',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'SU',
                    fullName: 'Sit-Ups',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'Sq',
                    fullName: 'Reverse Wrist Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'ETK',
                    fullName: 'Elbow To Knee',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'BSS',
                    fullName: 'Bulgarian Slit Squats',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'LR',
                    fullName: 'Leg Raises',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'SCR',
                    fullName: 'Standing Calf Raise',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'RT',
                    fullName: 'Russian Twist',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },]
            }, 'modified');

            realm.create('WorkoutDay', {
                id:2,
                timestamp: currentDate,
                exercises:[{
                    exerciseKey: 'BOR',
                    fullName: 'Bent Over Row',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'BP',
                    fullName: 'Bench Press',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                }]
            }, 'modified');

            realm.create('WorkoutDay', {
                id:3,
                timestamp: currentDate,
                exercises:[{
                    exerciseKey: 'LBTE',
                    fullName: 'Lying Barbell Triceps Extension',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'RWC',
                    fullName: 'Reverse Wrist Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },{
                    exerciseKey: 'WC',
                    fullName: 'Wrist Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'WSC',
                    fullName: 'Wrist Side Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'WP',
                    fullName: 'Wrist Pronation',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
                {
                    exerciseKey: 'WS',
                    fullName: 'Wrist Suplination',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },]
            }, 'modified');
          
        });
        
        console.log("Data successfully saved! ");
    };
    */


    const uploadToDrive = async () => {
    //console.log("uploadToDrive WORKED!")
        const backupUri = realm.path.replace('default.realm', 'backup.realm');
        const formattedUri = backupUri.startsWith('file://') ? backupUri : `file://${backupUri}`;
        const backupFile = new File(formattedUri);
        try{
            if(backupFile.exists){
                backupFile.delete();
                console.log("Old backup deleted!")
            }
            realm.writeCopyTo({path: backupUri});
            console.log("Backup created")

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(formattedUri, {
                    mimeType: 'application/json',
                    dialogTitle: 'Backup save'
                });
            }
        }catch(err){
            console.log("Error: ", err)
        }
        return;
    }

    function getFormattedDate(ts) {
        if (ts !== undefined && ts !== null) {
            return new Date(ts * 1000).toLocaleDateString('ru-RU',{
                day:'2-digit',
                month:'2-digit',
                year:'2-digit'
            })
        }

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
    };


    return (
        <DatabaseContext.Provider
            value={{
                uploadToDrive,
                workoutTable,
                weightHistory,
                loading,
                setLoading,
                getFormattedDate,
                checkHours,
                categories
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

// test
            
            /*
            realm.create('ExerciseWeightHistory', {
                id: 12 ,
                timestamp: Math.floor(Date.now() / 1000),
                fullName: 'Push Ups',
                weightData: {
                    color: "green", 
                    value: 7.5 
                }
            }, 'modified');
            */

            /*
            realm.create('WorkoutTemplate', {
                id: 0,
                category:'Forearms',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'RWC',
                    fullName: 'Reverse Wrist Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');

            realm.create('WorkoutTemplate', {
                id: 1,
                category:'Arms',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'BC',
                    fullName: 'Barbell Curl',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');

            realm.create('WorkoutTemplate', {
                id: 2,
                category:'Core',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'SU',
                    fullName: 'Sit Ups',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');

            realm.create('WorkoutTemplate', {
                id: 3,
                category:'Back',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'BR',
                    fullName: 'Barbell Row',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');

            realm.create('WorkoutTemplate', {
                id: 4,
                category:'Thighs',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'Sq',
                    fullName: 'Squats',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');
            

            realm.create('WorkoutTemplate', {
                id: 5,
                category:'Deltoids',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'LR',
                    fullName: 'Lateral Raise',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');

            realm.create('WorkoutTemplate', {
                id: 6,
                category:'Glutes',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'LP',
                    fullName: 'Sled 45° Leg Press',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');

            realm.create('WorkoutTemplate', {
                id: 7,
                category:'Chest',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'BP',
                    fullName: 'Bench Press',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');

            realm.create('WorkoutTemplate', {
                id: 8,
                category:'Unique',
                timestamp: currentDate,
                exercise: {
                    exerciseKey: 'RB',
                    fullName: 'Rice Bucket',
                    reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
                },
            }, 'modified');
            */    