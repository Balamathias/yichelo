'use client'

import { ListEnd, Home, Inbox, Search, Settings2 as Settings, LucideLogOut, LucideLoader } from "lucide-react"
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'


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
import { Button } from "@/components/ui/button"
import DynamicModal from "@/components/dynamic-modal"
import { DialogClose } from "@/components/ui/dialog"
import { useLogout } from "@/lib/react-query/user.query"
import { toast } from "sonner"

const items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Inbox,
    },
    {
      title: "Categories",
      url: "/dashboard/products/categories",
      icon: ListEnd,
    },
    {
      title: "Search",
      url: "/dashboard/search",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]

export default function AppSidebar() {

    const path = usePathname();
    const { mutate: logout, isPending: loggingOut } = useLogout();
    const router = useRouter();

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
                            <SidebarMenuButton asChild size={'lg'} className={cn('', item?.url === path && 'bg-brand/25 text-brand dark:text-brand-light dark:bg-brand-light/25')}>
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
            <div className="flex flex-row gap-1.5 items-center gap-y-3">
                <p className="text-muted-foreground">
                    &copy; {BRAND_NAME} {new Date().getFullYear()}.
                </p>
                <DynamicModal
                    trigger={
                        <Button variant={'ghost'} size={'icon'} className="rounded-xl">
                            <LucideLogOut size={24} />
                        </Button>
                    }
                >
                    <div className="flex flex-col gap-y-3">
                        <p className="text-lg font-semibold">Logout</p>
                        <p className="text-muted-foreground">Are you sure you want to logout?</p>
                        <div className="flex flex-row gap-3">
                            <DialogClose asChild>
                                <Button variant={'secondary'} size={'lg'} className="rounded-xl">Cancel</Button>
                            </DialogClose>
                            <Button variant={'default'} size={'lg'} className="rounded-xl"
                                onClick={() => logout(undefined, {
                                    onSuccess: () => {
                                        toast.success('Successfully logged out.')
                                        router.replace('/login')
                                    },
                                    onError: (err) => {
                                        console.error(err)
                                        toast.error('Failed to logout')
                                    }
                                })}
                                disabled={loggingOut}
                            >
                                {loggingOut && <LucideLoader size={24} className="animate-spin"/>}
                                {loggingOut ? 'Logging out...' : 'Logout'}
                            </Button>
                        </div>
                    </div>
                </DynamicModal>
            </div>
        </SidebarFooter>
    </Sidebar>
    )
}
  