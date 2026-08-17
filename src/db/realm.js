import { createRealmContext, Realm } from '@realm/react'
import { schema } from './schemas';

export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
    schema: schema,
    schemaVersion: 6,
        //deleteRealmIfMigrationNeeded:true
    /*
    onMigration:(oldRealm, newRealm) => {
        console.log("New version realm table")
    }
    */
    
})