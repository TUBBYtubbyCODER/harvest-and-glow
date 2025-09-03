import { useRef } from 'react'

const UploadForm = ({ 
  files, 
  onFileUpload, 
  onFileRemove, 
  dragOver, 
  setDragOver,
  maxFiles = 10,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}) => {
  const fileInputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    processFiles(selectedFiles)
  }

  const processFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      if (!acceptedTypes.includes(file.type)) {
        alert(`${file.name} is not a supported image format`)
        return false
      }
      if (file.size > maxFileSize) {
        alert(`${file.name} is too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB`)
        return false
      }
      return true
    })

    if (files.length + validFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`)
      return
    }

    validFiles.forEach(file => onFileUpload(file))
  }

  return (
    <div className="upload-form">
      <div 
        className={`upload-area ${dragOver ? 'dragover' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={(e) => { e.preventDefault(); setDragOver(false) }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon">🎨</div>
        <h3>Drop your images here or click to browse</h3>
        <p>
          Accepted formats: JPG, PNG, GIF, WebP • Max size: 5MB per file • 
          Max {maxFiles} files
        </p>
        
        <input 
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {files.length > 0 && (
        <div className="uploaded-files">
          <h4>Uploaded Images ({files.length})</h4>
          <div className="files-grid">
            {files.map((file, index) => (
              <div key={file.id} className="file-preview">
                <div className="file-icon">🖼️</div>
                <p className="file-name">{file.name}</p>
                <p className="file-size">
                  {(file.size / 1024 / 1024).toFixed(2)}MB
                </p>
                <button 
                  onClick={() => onFileRemove(file.id)}
                  className="remove-file"
                  aria-label={`Remove ${file.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadForm
