import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

type ColumnCreate = {
    name: string,
    type: string,
}

type ColumnInsert = {
    name: string,
    value: string | number | boolean | null,
}


const version = '0'

const db = SQLite.openDatabase("medidaslista.db", version)


const createTable = async (tabName: string, columns: ColumnCreate[]) => {

    try {
        const query = `CREATE TABLE IF NOT EXISTS ${tabName} (id INTEGER PRIMARY KEY AUTOINCREMENT,${columns.map((column) => {
            return `${column.name}`
        })
            })`

        const resultTable = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return resultTable[0].rowsAffected
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }


}

const insert = async (tabName: string, columns: ColumnInsert[]) => {
    try {
        const query = `INSERT INTO ${tabName}(${columns.map((column) => {
            return `${column.name}`
        })
            }) VALUES (${columns.map((column) => {
                return column.value
            })
            })`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result[0].insertId
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }

}

const select = async (tabName: string, columns?: string[]) => {
    try {
        const query = `SELECT 
        ${columns ?
                columns.map((column) => {
                    return column
                })
                :
                ` * `
            }
        FROM ${tabName}`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result[0].rows
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }

}

const deleteAll = async (tabName: string) => {
    try {
        const query = `DELETE FROM ${tabName}`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result[0].rows
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }

}

export {
    createTable,
    insert,
    select,
    deleteAll
}
