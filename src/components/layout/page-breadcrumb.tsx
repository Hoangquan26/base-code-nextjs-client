"use client"

import { Fragment } from "react"
import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export type BreadcrumbItemConfig = {
    label: string
    href?: string
}

type PageBreadcrumbProps = {
    items: BreadcrumbItemConfig[]
}

export default function PageBreadcrumb({ items }: PageBreadcrumbProps) {
    return (
        <Breadcrumb className=" mb-2">
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    return (
                        <Fragment key={`${item.label}-${index}`}>
                            <BreadcrumbItem>
                                {item.href && !isLast ? (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {!isLast ? <BreadcrumbSeparator /> : null}
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
