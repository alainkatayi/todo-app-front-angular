export interface AuthLoginData{
    email: string
    password : string
}

export interface AuthLoginResponse{
    id:number
    name: string
    email : string
    email_verified_at : string|null
    token: string
}

export interface AuthRegisterData{
    name:string
    email:string
    password:string
    password_confirmation:string
}

export interface AuthRegisterResponse{
    id: number
    name:string
    email:string
    password:string
    password_confirmation:string
}