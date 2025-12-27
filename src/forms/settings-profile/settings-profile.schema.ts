import * as Yup from 'yup';

export type SettingProfileSchemaType = {
    name?: string | null;
    phone?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    displayName?: string | null;
    gender?: string | null;
    birthDate?: string | null;
    locale?: string | null;    // dont use
    timezone?: string | null;  // dont use
    address?: string | null;
}

export const SettingProfileSchema: Yup.Schema<SettingProfileSchemaType> = Yup.object().shape({
    name: Yup.string().nullable().optional(),
    phone: Yup.string().nullable().optional(),
    firstName: Yup.string().nullable().optional(),
    lastName: Yup.string().nullable().optional(),
    displayName: Yup.string().nullable().optional(),
    gender: Yup.string().nullable().optional(),
    birthDate: Yup.string().nullable().optional(),
    locale: Yup.string().nullable().optional(),
    timezone: Yup.string().nullable().optional(),
    address: Yup.string().nullable().optional(),
}) as Yup.Schema<SettingProfileSchemaType>;