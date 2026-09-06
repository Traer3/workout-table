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
            exerciseKey: 'string?',
            category:'string?',
            fullName: {type: 'string', indexed: true},
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
            category:'string?', // можно убрать , внутри Exercise есть свой category
            timestamp: 'int',
            exercise: 'Exercise?', //Можно создать свой Exercise где fullName будет primaryKey для быстрого поиска 
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
};

export class PresetsHistory extends Realm.Object {
    static schema = {
        name: 'PresetsHistory',
        primaryKey: 'id',
        properties: {
            id:'int',
            timestamp: 'int',
            exercise: 'Exercise[]',
        }
    }
}

export const schema = [Action, Exercise, WorkoutDay, ExerciseWeightHistory, WorkoutTemplate, PresetsHistory];
