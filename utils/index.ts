// utils/getImagePath.ts
export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = "https://res.cloudinary.com";
    if (imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath;
    }
    return ""; 
}
