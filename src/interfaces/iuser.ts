export interface IUserCredential {
    email: string
    password: string
}

export interface IUserAuth {
    uid: string
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    providerData: ProviderDaum[]
    stsTokenManager: StsTokenManager
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string
}

interface ProviderDaum {
    providerId: string
    uid: string
    displayName: any
    email: string
    phoneNumber: any
    photoURL: any
}

interface StsTokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
}

export interface IUser {
    email: string
    firstName: string
    lastName: string
    cpf: string
}