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

export class ExerciseWeightHistory extends Realm.Object {
    static  schema ={
        name : 'ExerciseWeightHistory',
        primaryKey: 'id',
        properties: {
            id: 'int',
            exerciseName: 'string',
            weightValue: 'double',
            day: 'string',
            timestamp: 'int',
        },
    };
}



export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
    schema: [Action, Exercise, WorkoutDay, ExerciseWeightHistory],
    schemaVersion: 3,
    /*
    onMigration:(oldRealm, newRealm) => {
        console.log("New version realm table")
    }
    */
})