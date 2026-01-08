/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
    async find(ctx) {
        // Strip createdBy from incoming query safely
        if (ctx.query.populate) {
            if (ctx.query.populate === 'createdBy' || ctx.query.populate === '*') {
                delete ctx.query.populate;
            } else if (typeof ctx.query.populate === 'object' && !Array.isArray(ctx.query.populate)) {
                // @ts-ignore
                delete ctx.query.populate.createdBy;
            } else if (Array.isArray(ctx.query.populate)) {
                ctx.query.populate = ctx.query.populate.filter(p => p !== 'createdBy');
            }
        }

        return super.find(ctx);
    },

    async findOne(ctx) {
        if (ctx.query.populate) {
            if (ctx.query.populate === 'createdBy' || ctx.query.populate === '*') {
                delete ctx.query.populate;
            } else if (typeof ctx.query.populate === 'object' && !Array.isArray(ctx.query.populate)) {
                // @ts-ignore
                delete ctx.query.populate.createdBy;
            } else if (Array.isArray(ctx.query.populate)) {
                ctx.query.populate = ctx.query.populate.filter(p => p !== 'createdBy');
            }
        }

        return super.findOne(ctx);
    }
}));
