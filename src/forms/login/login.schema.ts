import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Tên đăng nhập không được bỏ trống').trim().min(5, 'Tên đăng nhập quá ngắn'),
    password: Yup.string().required('Mật khẩu không được bỏ trống').min(8, 'Mật khẩu quá ngắn')
})