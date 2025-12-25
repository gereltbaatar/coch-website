// Cloudinary upload function - uploads image and returns optimized webp URL
export async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
    )

    if (!response.ok) {
        throw new Error('Failed to upload image')
    }

    const data = await response.json()

    // Return optimized webp URL with 80% quality compression
    const optimizedUrl = data.secure_url.replace(
        '/upload/',
        '/upload/f_webp,q_80/'
    )

    return optimizedUrl
}

// Upload multiple images
export async function uploadMultipleToCloudinary(files: File[]): Promise<string[]> {
    const uploadPromises = files.map(file => uploadToCloudinary(file))
    return Promise.all(uploadPromises)
}
