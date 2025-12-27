export type changePasswordInitType = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export const changePasswordInitial: changePasswordInitType = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
}