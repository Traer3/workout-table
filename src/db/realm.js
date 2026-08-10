import { createRealmContext, Realm } from '@realm/react'
import { schema } from './schemas';

export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
    schema: schema,
<<<<<<< HEAD
    schemaVersion: 5,
    //deleteRealmIfMigrationNeeded:true
=======
    schemaVersion: 4,
//ебанул 5 нахуй
>>>>>>> 392c4038fe95f470d74902fb248f6380429d0566
    /*
    onMigration:(oldRealm, newRealm) => {
        console.log("New version realm table")
    }
    */
    
})