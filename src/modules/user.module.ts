import { UserProfile } from "./profile.module";

export enum AvatarSource {
    UPLOAD,
    S3,
    SOCIAL
}

export enum UserStatus {
    ACTIVE,
    PENDING,
    SUSPENDED,
    DELETED
}

export type UserModule = {
    id: string;
    email: string;
    emailVerifiedAt: Date;
    phoneVerifiedAt: Date;
    phone: string;
    passwordHash: string;
    name: string;
    avatarUrl: string;
    avatarSource: string;
    avatarUpdatedAt: string;
    status: string;
    lastLoginAt: string;
    lastLoginIp: string;
    createdAt: string;
    updatedAt: string;

    profile?: UserProfile;
}