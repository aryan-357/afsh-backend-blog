/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
    async find(ctx) {
        // Only set default population if not explicitly requested, or merge if requested
        const defaultPopulate = {
            createdBy: {
                fields: ['firstname', 'lastname', 'username']
            },
            coverContent: true,
        };

        if (!ctx.query.populate) {
            ctx.query.populate = defaultPopulate;
        } else if (typeof ctx.query.populate === 'object') {
            ctx.query.populate = { ...ctx.query.populate, ...defaultPopulate };
        }
        // If it's a string like '*', let it be (*) or keep it as is. 
        // Forcing createdBy on '*' can sometimes cause schema validation issues in v5.

        return super.find(ctx);
    },

    async findOne(ctx) {
        const defaultPopulate = {
            createdBy: {
                fields: ['firstname', 'lastname', 'username']
            },
            coverContent: true,
        };

        if (!ctx.query.populate) {
            ctx.query.populate = defaultPopulate;
        } else if (typeof ctx.query.populate === 'object') {
            ctx.query.populate = { ...ctx.query.populate, ...defaultPopulate };
        }

        return super.findOne(ctx);
    }
}));
