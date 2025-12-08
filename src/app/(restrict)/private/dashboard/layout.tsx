import type { Metadata } from 'next'
import { SidebarDashboard } from './_components/sidebar'

export const metadata: Metadata = {
  title: 'Home - CaamaConecta',
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SidebarDashboard>{children}</SidebarDashboard>
}
