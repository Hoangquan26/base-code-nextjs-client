'use client'

import AppLogo from "@/components/shared/app-logo/app-logo"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function NotFound() {
    const router = useRouter()

    const handleRouteBack = () => {
        router.back()
    }
    return (
        <div className=" h-screen flex items-center justify-center">
            <Empty>
                <EmptyHeader >
                    <EmptyMedia>
                        <div className="flex items-center justify-center gap-3 text-slate-900 dark:text-white mb-8">
                            <AppLogo />
                            <h2 className="text-2xl text-vicenza-500 font-bold leading-tight tracking-[-0.015em]">VICENZA CRM</h2>
                        </div>
                    </EmptyMedia>
                </EmptyHeader>
                <EmptyContent>
                    <EmptyTitle>
                        <div className="flex flex-col gap-4 mb-10">
                            <h2 className="text-2lg md:text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">
                                Không tìm thấy trang
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-md font-normal leading-relaxed mx-auto">
                                Không thể tìm thấy trang bạn đang tìm kiếm. Trang có thể đã bị xóa, đổi tên hoặc đường dẫn đã bị hỏng.
                            </p>
                        </div>
                    </EmptyTitle>
                    <EmptyDescription>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                            <Link className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-vicenza-500 h-12 px-8 text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-200"
                                href="/">
                                Quay lại trang chính
                            </Link>
                            <Button onClick={handleRouteBack} className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-transparent border-2 border-slate-200 dark:border-slate-700 h-12 px-8 text-base font-semibold text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-200" >
                                Quay lại
                            </Button>
                        </div>
                        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <p className="text-sm text-slate-400 dark:text-slate-500">
                                Bạn cần hỗ trợ? <a className="text-primary hover:underline" href="mailto:support@crmnexus.com">Liên hệ phòng Chuyển đổi số</a>
                            </p>
                        </div>
                    </EmptyDescription>
                </EmptyContent>
            </Empty>
        </div>
    )
}