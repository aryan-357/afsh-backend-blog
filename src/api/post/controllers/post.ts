/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                ...(typeof ctx.query.populate === 'object' ? ctx.query.populate : {}),
                createdBy: {
                    fields: ['firstname', 'lastname', 'username']
                },
                coverContent: true,
            },
        };
        return super.find(ctx);
    },

    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                ...(typeof ctx.query.populate === 'object' ? ctx.query.populate : {}),
                createdBy: {
                    fields: ['firstname', 'lastname', 'username']
                },
                coverContent: true,
            },
        };
        return super.findOne(ctx);
    }
}));
