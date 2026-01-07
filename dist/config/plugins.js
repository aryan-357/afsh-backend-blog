"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => {
    if (env('NODE_ENV') === 'production') {
        const requiredVars = ['CLOUDINARY_NAME', 'CLOUDINARY_KEY', 'CLOUDINARY_SECRET'];
        const missingVars = requiredVars.filter((key) => !env(key));
        if (missingVars.length > 0) {
            throw new Error(`Missing required environment variables for Cloudinary in production: ${missingVars.join(', ')}. ` +
                `Without these, uploads will disappear on redeployment.`);
        }
    }
    return {
        upload: {
            config: {
                provider: 'cloudinary',
                providerOptions: {
                    cloud_name: env('CLOUDINARY_NAME'),
                    api_key: env('CLOUDINARY_KEY'),
                    api_secret: env('CLOUDINARY_SECRET'),
                },
                actionOptions: {
                    upload: {},
                    uploadStream: {},
                    delete: {},
                },
            },
        },
    };
};
