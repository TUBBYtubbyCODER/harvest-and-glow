import { useState } from 'react'

export const useFileUpload = () => {
  const [files, setFiles] = useState([])

  const uploadFile = (file) => {
    const fileWithId = {
      ...file,
      id: `${Date.now()}-${file.name}`,
      uploadedAt: new Date().toISOString()
    }
    setFiles(prev => [...prev, fileWithId])
  }

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const clearFiles = () => {
    setFiles([])
  }

  return {
    files,
    uploadFile,
    removeFile,
    clearFiles
  }
}
