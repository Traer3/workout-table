import Realm from "realm";

//это для backupReader.js 
//если эта поебота сработает , то ебани её в realm.js 
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

export class WorkoutDay extends Realm.Object { 
    static schema = {
        name: 'WorkoutDay',
        primaryKey: 'day',
        properties: {
            day: 'string',
            PU: 'Exercise?',
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
    static schema = {
        name: 'ExerciseWeightHistory',
        primaryKey: 'id',
        properties: {
            id: 'int',
            day: 'string',
            timestamp: 'int',
            fullName:"string",
            weightData: 'Action'
        },
    };
}

export const schema = [Action, Exercise, WorkoutDay, ExerciseWeightHistory];
