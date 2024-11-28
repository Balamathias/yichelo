import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full h-full min-h-screen dark:bg-background">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
