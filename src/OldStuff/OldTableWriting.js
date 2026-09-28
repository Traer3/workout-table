// realm.create(workoutTemplate, {
//                 id: 0,
//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Forearms',
//                     fullName: 'Reverse Wrist Curl',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');

//             realm.create(workoutTemplate, {
//                 id: 1,
//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Arms',
//                     exerciseKey: 'BC',
//                     fullName: 'Barbell Curl',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');

//             realm.create(workoutTemplate, {
//                 id: 2,
//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Core',
//                     exerciseKey: 'SU',
//                     fullName: 'Sit Ups',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');

//             realm.create(workoutTemplate, {
//                 id: 3,

//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Back',
//                     exerciseKey: 'BR',
//                     fullName: 'Barbell Row',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');

//             realm.create(workoutTemplate, {
//                 id: 4,

//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Thighs',
//                     exerciseKey: 'Sq',
//                     fullName: 'Squats',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');


//             realm.create(workoutTemplate, {
//                 id: 5,

//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Deltoids',
//                     exerciseKey: 'LR',
//                     fullName: 'Lateral Raise',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');

//             realm.create(workoutTemplate, {
//                 id: 6,

//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Glutes',
//                     exerciseKey: 'LP',
//                     fullName: 'Sled 45° Leg Press',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');

//             realm.create(workoutTemplate, {
//                 id: 7,

//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Chest',
//                     exerciseKey: 'BP',
//                     fullName: 'Bench Press',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');

//             realm.create(workoutTemplate, {
//                 id: 8,

//                 timestamp: currentDate,
//                 exercise: {
//                     category: 'Unique',
//                     exerciseKey: 'RB',
//                     fullName: 'Rice Bucket',
//                     reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
//                 },
//             }, 'modified');

 const saveDemoWorkout = () => {
        /*
        const createEx = (key, name) => ({
            exerciseKey: key,
            fullName: name,
            reps1: { color: '', value: 0 }, rest1: { color: '', value: 0 }, 
            reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 }
        });

        const arms = () => [
            createEx('LBTE', 'Lying Barbell Triceps Extension'),
            createEx('RWC', 'Reverse Wrist Curl'),
            createEx('WC', 'Wrist Curl'),
            createEx('WSC', 'Wrist Side Curl'),
            createEx('WP', 'Wrist Pronation'),
            createEx('WS', 'Wrist Suplination')
        ];

        const legsAndAbs = () => [
            createEx('RD', 'Romanian Deadlift'),
            createEx('SU', 'Sit-Ups'),
            createEx('Sq', 'Squats'),
            createEx('ETK', 'Elbow To Knee'),
            createEx('BSS', 'Bulgarian Split Squats'),
            createEx('LR', 'Leg Raises'),
            createEx('SCR', 'Standing Calf Raise'),
            createEx('RT', 'Russian Twist')
        ];

        const upperBody = () => [
            createEx('BOR', 'Bent Over Row'),
            createEx('BP', 'Bench Press')
        ];

        realm.write(()=>{
            realm.create('WorkoutDay', { id: 1, timestamp: 1788220800, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 2, timestamp: 1788480000, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 3, timestamp: 1788566400, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 4, timestamp: 1788739200, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 5, timestamp: 1788998400, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 6, timestamp: 1789084800, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 7, timestamp: 1789257600, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 8, timestamp: 1789516800, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 9, timestamp: 1789603200, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 10, timestamp: 1789776000, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 11, timestamp: 1790035200, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 12, timestamp: 1790121600, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 13, timestamp: 1790294400, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 14, timestamp: 1790553600, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 15, timestamp: 1790640000, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 16, timestamp: 1790812800, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 17, timestamp: 1791072000, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 18, timestamp: 1791158400, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 19, timestamp: 1791331200, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 20, timestamp: 1791590400, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 21, timestamp: 1791676800, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 22, timestamp: 1791849600, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 23, timestamp: 1792108800, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 24, timestamp: 1792195200, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 25, timestamp: 1792368000, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 26, timestamp: 1792627200, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 27, timestamp: 1792713600, exercises: upperBody() }, 'modified');
            realm.create('WorkoutDay', { id: 28, timestamp: 1792886400, exercises: arms() }, 'modified');
            realm.create('WorkoutDay', { id: 29, timestamp: 1793145600, exercises: legsAndAbs() }, 'modified');
            realm.create('WorkoutDay', { id: 30, timestamp: 1793232000, exercises: upperBody() }, 'modified');
        });
        console.log("\n","MY BODY IS A MACHINE","\n","FOR NOW")
        */

        //console.log("Data created!")
    }