'use client'

import { FormikForm, FormikInput, FormikSubmitButton } from "@/components/form/formik";
import AppLogo from "@/components/shared/app-logo/app-logo";
import { loginInitial, type LoginType } from "@/forms/login/login.init";
import { LoginSchema } from "@/forms/login/login.schema";
import { authService } from "@/services/auth.service";
import { AuthActions } from "@/stores/auth/auth.action";
import Link from "next/link";

export default function page() {
    const handleOauth = (type: 'facebook' | 'google' = 'facebook') => {
        AuthActions.oauth(type)
    }

    return (
        <div className="flex w-full flex-col justify-center overflow-y-auto px-4 py-8 sm:px-6 xl:py-14 relative z-10">
            <div className="mx-auto w-full max-w-sm lg:w-[420px]">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-10">
                    <div className="size-8 text-primary">
                        <AppLogo />
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Vicenza CRM</h2>
                </div>
                <div className="flex flex-col gap-3 mb-8">
                    <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">
                        Đăng nhập tài khoản
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                        Hệ thống quản lý nhân sự ...
                    </p>
                </div>
                <FormikForm
                    initialValues={{
                        ...loginInitial,
                    }}
                    onSubmit={async (values: LoginType, { setStatus }) => {
                        try {
                            const submited = await AuthActions.login(values)

                            setStatus('')
                            return;
                        }
                        catch (error) {
                            const message = (error as Error).message
                            setStatus('Tên đăng nhập hoặc mật khẩu không hợp lệ')
                        }
                    }}
                    validationSchema={LoginSchema}
                >
                    <FormikInput
                        label="Tên đầy đủ"
                        id="email"
                        name="email"
                        placeholder="phongcongnghe | phongcongnghe@yahoo.com"
                        type="text"
                        required

                    />

                    <FormikInput
                        label="Mật khẩu"
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu để đăng nhập"
                        type="password"
                        required
                    />

                    <FormikSubmitButton className="mt-2 flex w-full items-center justify-center rounded-lg bg-vicenza h-12 px-6 text-base font-bold text-white shadow-sm hover:bg-vicenza-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors" >
                        Đăng nhập
                    </FormikSubmitButton>
                </FormikForm>
                <div className="relative mt-8">
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white dark:bg-slate-900 px-4 text-slate-500 dark:text-slate-400">Hoặc đăng nhập với</span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleOauth('google')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 8.16-3.293 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.133H12.48z"></path>
                        </svg>
                        Google
                    </button>
                    <button
                        onClick={() => handleOauth('facebook')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"></path>
                        </svg>
                        Facebook
                    </button>
                </div>
                <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    Chưa có tài khoản CRM?
                    <Link className="font-bold text-primary hover:text-blue-500 hover:underline transition-all" href="/register"> Đăng ký</Link>
                </p>
                <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
                    @Phòng chuyển đổi số - Vicenza 2025
                </p>
            </div>
        </div>
    );
}
