import React from 'react'

export default function AppLoading() {
    return (
        <div className=" w-full flex items-center justify-center fixed top-1/2 -translate-y-1/2">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 dark:bg-primary/5 blur-[100px]"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary/5 dark:bg-secondary/10 blur-[100px]"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-6">
                <div className="relative mb-12">
                    <div className="w-14 h-14 rounded-full border-[2px] border-vicenza-200 dark:border-slate-800"></div>
                    <div className="absolute top-0 left-0 w-14 h-14 rounded-full border-[2px] border-vicenza-500 border-t-transparent animate-spin"></div>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
                        Đang khởi tạo...
                    </h1>
                    <p className="text-[11px] text-slate-400 dark:text-slate-600 font-mono tracking-wide opacity-70">
                        Kết nối tới server
                    </p>
                </div>
            </div>
        </div>
    )
}
