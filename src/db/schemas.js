import Realm from "realm";

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
            exerciseKey: 'string',
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
        primaryKey: 'id',
        properties: {
            id:'int',
            timestamp: 'int',
            exercises: 'Exercise[]',
        },
    };
};

export class WorkoutTemplate extends Realm.Object { 
    static schema = {
        name: 'WorkoutTemplate',
        primaryKey: 'id',
        properties: {
            id:'int',
            category:'string?',
            timestamp: 'int',
            exercise: 'Exercise?',
        },
    };
};



export class ExerciseWeightHistory extends Realm.Object {
    static schema = {
        name: 'ExerciseWeightHistory',
        primaryKey: 'id',
        properties: {
            id: 'int',
            //day: 'string',
            timestamp: 'int',
            fullName:"string",
            weightData: 'Action'
        },
    };
}

export const schema = [Action, Exercise, WorkoutDay, ExerciseWeightHistory, WorkoutTemplate];
