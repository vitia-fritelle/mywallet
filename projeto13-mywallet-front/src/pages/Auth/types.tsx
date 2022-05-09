export type AuthPage = {
    setName?: (name: string) => void,
    setToken?: (token: string) => void,
    type:AuthTypes
}

export enum AuthTypes {
    LOGIN,
    REGISTER
}