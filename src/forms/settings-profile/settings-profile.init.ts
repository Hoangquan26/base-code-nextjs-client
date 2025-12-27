export type SettingProfileType = {
    name?: string | null;
    phone?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    displayName?: string | null;
    gender?: string | null;
    birthDate?: string | null;
    locale?: string | null;
    timezone?: string | null;
    address?: string | null;
}

export const SettingProfileInitial: SettingProfileType = {
    address: '',
    birthDate: '',
    displayName: '',
    firstName: '',
    gender: '',
    lastName: '',
    locale: '', //dont use
    name: '',
    phone: '',
    timezone: '', //dont use
}