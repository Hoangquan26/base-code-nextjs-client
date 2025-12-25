export type RegisterType = {
    name?: string;
    email: string;
    password: string;
    confirmPassword: string
}

export const registerInitial: RegisterType = {
    confirmPassword: '',
    email: '',
    password: '',
    name: ''
}