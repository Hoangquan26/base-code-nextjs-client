import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Mật khẩu hiện tại không được bỏ trống'),
    newPassword: Yup.string().required('Mật khẩu mới không được bỏ trống').min(8, 'Mật khẩu mới quá ngắn'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Mật khẩu mới chưa khớp')
})