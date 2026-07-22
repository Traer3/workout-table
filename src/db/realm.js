import { createRealmContext, Realm } from '@realm/react'
import { schemaVersion } from 'realm';

export class Action extends Realm.Object {
    static schema = {
        name: 'Action',
        properties: {
            color: 'string',
            value: 'double',
        },
    };
}

export class Exercise extends Realm.Object {
    static schema = {
        name: 'Exercise',
        properties: {
            fullName: 'string',
            reps1: 'Action',
            rest1: 'Action',
            reps2: 'Action',
            rest2: 'Action',
        },
    };
}

export class WorkoutDay extends Realm.Object { //Разобратся как добавлять новые треши , без хардкода 
    static schema = {
        name: 'WorkoutDay',
        primaryKey: 'day',
        properties:{
            day: 'string',
            PU:'Exercise?',
            RWC: 'Exercise?',
            WC: 'Exercise?',
            WSC: 'Exercise?',
            WP: 'Exercise?',
            WS: 'Exercise?',
            SU: 'Exercise?',
            Sq: 'Exercise?',
            ETK: 'Exercise?',
            SCR: 'Exercise?',
            BSS: 'Exercise?',
            LR: 'Exercise?',
            EP: 'Exercise?',
            BR: 'Exercise?',
        },
    };
};

  //{
    // "day": "12.05.26",
    // "id": 4,
    // "timestamp": 1784493685, 
    // "PU": {
    //  "fullName": "Wrist Pronation",
    //  "data": { 
    //      "color": "green", 
    //      "value": 10 
    //  },
    //}

export class ExerciseWeightHistory extends Realm.Object {
    static  schema ={
        name : 'ExerciseWeightHistory',
        primaryKey: 'id',
        properties: {
            id: 'int',
            day: 'string',
            timestamp: 'int',
            key:{
                
            }
            
        },
    };
}
/*
{
        "day": "09.07.26", 
        "exerciseName": "Wrist Suplination", 
        "id": 0, 
        "timestamp": 1784491176, 
        "weightValue": 7.5
        }, 
*/


export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
    schema: [Action, Exercise, WorkoutDay, ExerciseWeightHistory],
    schemaVersion: 3,
    /*
    onMigration:(oldRealm, newRealm) => {
        console.log("New version realm table")
    }
    */
})