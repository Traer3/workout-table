import { Realm } from "realm";
import path  from 'path';

const backupFilePath = path.resolve("./backup.realm")


async function getJsonFromBackup(backupPath) {
    let backupRealm = null;

    try{
        backupRealm = await Realm.open({
            path: backupPath,
            schema: [WorkoutDay, ExerciseWeightHistory],
            readOnly: true,
        });

        const backupJsonData = {
            exportDate: new Date().toISOString(),
            workoutDays: backupRealm.objects('WorkoutDay').toJSON(),
            weightHistory: backupRealm.objects('ExerciseWeightHistory').toJSON(),
        };

        backupRealm.close();

        const jsonString = JSON.stringify(backupJsonData, null, 2);
        console.log("Data extracted from REALM backup");
        console.log("jsonString: ", jsonString)
        return jsonString;
    }catch(err){
        console.error('Error while reading realm backup : ', err);
        if(backupRealm && !backupRealm.isClosed){
            backupRealm.close();
        }
        return null;
    }
}

getJsonFromBackup(realmBackup)