'use client'

import { ListEnd, Home, Inbox, Search, Settings2 as Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { BRAND_NAME } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Products",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Categories",
      url: "#",
      icon: ListEnd,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

export default function AppSidebar() {
    return (
    <Sidebar>
        <SidebarHeader className="py-4 mb-3">
            <Link href={'/'} className="text-xl font-semibold text-brand-light flex items-center flex-row gap-x-1.5">
                <Image 
                    src={'/meta/logo.png'}
                    width={200}
                    height={200}
                    alt={BRAND_NAME}
                    className="w-8 h-8"
                />
                <span>{BRAND_NAME}</span>
            </Link>
        </SidebarHeader>

        <SidebarContent className="mt-6">
            <SidebarGroup>
                <SidebarGroupLabel className="text-xl font-semibold">Overview</SidebarGroupLabel>
                <SidebarGroupContent className="mt-4">
                    <SidebarMenu className="gap-y-5">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className="text-base">
                            <SidebarMenuButton asChild size={'lg'}>
                                <Link href={item.url} className="py-3 text-base">
                                    <item.icon className="w-10 h-10" size={32} />
                                    <span className="text-base">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
            <div className="flex flex-col gap-y-3">
                <p className="text-muted-foreground">
                    &copy; {BRAND_NAME} {new Date().getFullYear()}.
                </p>
            </div>
        </SidebarFooter>
    </Sidebar>
    )
}
  