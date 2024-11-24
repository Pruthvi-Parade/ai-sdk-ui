'use client'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { FileUploader } from '@/components/Uploader'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-[60px] py-8">
            <h3 className="text-foreground text-3xl font-medium">File Upload</h3>
            <div className="mt-8">
              <FileUploader />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}