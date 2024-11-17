import { UploadCloud } from "lucide-react"
import { useState } from "react"

export function FileUploader() {
  const [dragActive, setDragActive] = useState(false)

  return (
    <div
      className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors
        ${dragActive 
          ? "border-primary bg-primary/10" 
          : "border-muted-foreground/25 hover:border-primary/50"
        }`}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDrop={() => setDragActive(false)}
    >
      <input
        type="file"
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={(e) => {
          // Handle file upload
          console.log(e.target.files)
        }}
      />
      <div className="flex flex-col items-center gap-4">
        <UploadCloud className="h-12 w-12 text-muted-foreground" />
        <div className="space-y-2">
          <p className="text-lg font-medium">Drop files here or click to upload</p>
          <p className="text-sm text-muted-foreground">
            Supports images, documents, and more
          </p>
        </div>
      </div>
    </div>
  )
}