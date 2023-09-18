import React, { createContext, useCallback, useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { AppContextData } from '../interfaces/context';
import { IMedida, IMedidaApi } from '../interfaces/imedidas';
import { createTable, insert, select } from '../db/DBHelper';
import { auth, db } from '../config/firebase';
import { enigma } from '../utils/enigma';
import { Alert, Linking } from 'react-native';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { IUserAuth, IUserCredential } from '../interfaces/iuser';

const AppContext = createContext({} as AppContextData)

function AppProvider({ children }: any) {
    const [medidas, setMedidas] = useState<IMedida[]>([])
    const [appLoad, setAppLoad] = useState<boolean>(false)
    const [userAuth, setUserAuth] = useState<IUserAuth | null>(null)

    const monitoramentoPressao = ({ max, min }: IMedida) => {
        const numberMax = parseInt(max, 10)
        const numberMin = parseInt(min, 10)
        console.log('Monitonamento: ', numberMax + ' ' + numberMin)

        if (numberMax > 130 && numberMax < 160) {
            Alert.alert('Aviso!', 'Sua pressão requer cuidado')
        }
        if (numberMax > 159 && numberMax < 160) {
            Alert.alert('Aviso!', 'Verifique se tomou seu remedio para pressão, ou vá a um posto de saúde proximo')
        }
        if (numberMax > 179) {
            Alert.alert(
                'Alerta!',
                'Risco de infarto, clique em "sim" para chamar os paramedicos!',
                [
                    {
                        text: 'Não',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    {
                        text: 'Sim',
                        onPress: () => Linking.openURL(`tel:193`),
                    },
                ],
                { cancelable: false },
            );
        }


    }

    const adicionaMedidaApi = useCallback(async ({ id, max, min, date, userId }: IMedidaApi) => {
        const usersRef = collection(db, "medida");
        await addDoc(usersRef, { id, max, min, date })

    }, [])

    const adicionaMedida = useCallback(async ({ max, min, date }: IMedida) => {
        const result = await insert("medidas", [
            { name: "max", value: max },
            { name: "min", value: min },
            { name: "date", value: date }
        ])
        monitoramentoPressao({ max, min, date })
        /*  const data = {
             id: result, max, min, date, userId: userAuth?.uid
         } as IMedidaApi
 
         await adicionaMedidaApi(data) */
    }, [])

    const getDataApi = async () => {
        setAppLoad(true)
        try {

            const q = query(collection(db, "medidas"), where("userId", "==", true));

            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map(docs => {
                return {
                    ...docs.data()
                }
            }) as IMedida[]

            console.log(data)

            setMedidas(data)

            return true

        } catch (e) {
            if (e) {
                Alert.alert('Aviso', JSON.stringify(e))
            } else {
                Alert.alert('Aviso', 'Falha ao obter os dados do servidor.\n Favor, tente mais tarde')
            }
            return false
        } finally {
            setAppLoad(false)
        }
    }

    const login = async ({ email, password }: IUserCredential) => {
        setAppLoad(true)
        try {
            const passwordCrypto = await enigma(password)
            console.log(passwordCrypto)
            const { user } = await signInWithEmailAndPassword(auth, email, passwordCrypto)
            console.log(JSON.stringify(user))
            return true
        } catch (e) {
            if (e) {
                Alert.alert('Aviso', JSON.stringify(e))
            } else {
                Alert.alert('Aviso', 'Verifique seu email e/ou senha se estão corretos')
            }
            return false
        } finally {
            setAppLoad(false)
        }

    }

    useEffect(() => {
        (async () => {
            await createTable("medidas", [
                { name: "max", type: "TEXT" },
                { name: "min", type: "TEXT" },
                { name: "date", type: "INTEGER" }
            ])
        })()

    }, [])

    useEffect(() => {
        (async () => {
            const result = await select("medidas")
            console.log(result)
            setMedidas(result)
        })()

    }, [])

    return (
        <AppContext.Provider value={{ appLoad, adicionaMedida, medidas, login, getDataApi }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }