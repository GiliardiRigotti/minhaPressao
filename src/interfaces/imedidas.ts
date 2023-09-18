export interface IMedida {
    id?: number
    max: string
    min: string
    date: number
}

export interface IMedidaApi extends IMedida {
    userId: string
}