import { changePasswordInitType } from "@/forms/change-password/change-password.init"
import { SettingProfileSchemaType } from "@/forms/settings-profile/settings-profile.schema"
import { ApiErrorResponse, ApiResponse } from "@/lib/api/api.type"
import { apiClientFetch } from "@/lib/api/client"

export const profileApiRoute = {
    changePassword: () => '/user/me/password',
    updateAvatar: () => '/user/me/avatar/upload',
    updateProfile: () => '/user/profile/update'
}

export const profileService = {
    changePassword(payload: Omit<changePasswordInitType, 'confirmNewPassword'>) {
        return apiClientFetch<ApiResponse<any> | ApiErrorResponse>(
            profileApiRoute.changePassword(),
            {
                method: 'PATCH',
                body: JSON.stringify(payload),
            }
        )
    },

    updateProfile(payload: SettingProfileSchemaType) {
        return apiClientFetch<ApiResponse<any> | ApiErrorResponse>(
            profileApiRoute.updateProfile(),
            {
                method: 'PATCH',
                body: JSON.stringify(payload),
            }
        )
    }
}
