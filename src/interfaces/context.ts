import { IMedida } from "./imedidas";
import * as SQLite from 'expo-sqlite';
import { IUserCredential } from "./iuser";

export interface AppContextData {
    appLoad: boolean
    adicionaMedida: ({ max, min, date }: IMedida) => void
    medidas: IMedida[]
    login: ({ email, password }: IUserCredential) => Promise<boolean>
    getDataApi: () => Promise<boolean>
}