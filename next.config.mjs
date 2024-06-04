/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'

            },
            {
                protocol: 'https',
                hostname: 'www.gravatar.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'dummyimage.com'
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com'
            }
        ]
    }
};

export default nextConfig;
