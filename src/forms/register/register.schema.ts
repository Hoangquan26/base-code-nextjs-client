import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trông'),
    password: Yup.string().required('Mật khẩu không được bỏ trống').min(8, 'Mật khẩu quá ngắn'),
    name: Yup.string().optional().min(8, 'Tên tài khoản quá ngắn'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Mật khẩu chưa khớp')
});
