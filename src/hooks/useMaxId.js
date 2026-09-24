import { useState } from "react"
import { useObject, useQuery } from "../db/realm"

export const useMaxId = (tableName) => {
    const items = useQuery(tableName);
    const maxId = items.max('id') ?? -1;
    const nexId = maxId + 1;
    return { id: nexId, maxId }
}