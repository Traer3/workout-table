import { createRealmContext, Realm } from '@realm/react'
import { schema } from './schemas';

export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
    schema: schema,
    schemaVersion: 4,
//ебанул 5 нахуй
    /*
    onMigration:(oldRealm, newRealm) => {
        console.log("New version realm table")
    }
    */
    
})