'use client'

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default function notFound() {
    return (
        <div className=" h-screen flex items-center justify-center">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia>
                    </EmptyMedia>
                    <EmptyTitle>Không tìm thấy trang</EmptyTitle>
                </EmptyHeader>
                <EmptyContent>
                    <EmptyDescription></EmptyDescription>
                </EmptyContent>
            </Empty>
        </div>
    )
}
