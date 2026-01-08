import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // 1. Configure Permissions (using db query for system models)
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const permissions = [
          'api::notice.notice.find',
          'api::notice.notice.findOne',
          'api::post.post.find',
          'api::post.post.findOne',
          'api::author.author.find',
          'api::author.author.findOne',
          'api::category.category.find',
          'api::category.category.findOne',
        ];

        for (const action of permissions) {
          const permissionExists = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: {
              role: publicRole.id,
              action: action,
            },
          });

          if (!permissionExists) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action: action,
                role: publicRole.id,
              },
            });
            strapi.log.info(`[Bootstrap] Granted public permission: ${action}`);
          }
        }
      }

      // 2. Create Sample Notice (using documents API for content types in v5)
      // Check if any notices exist
      // @ts-ignore - Types are not generated yet for this new content type
      const count = await strapi.documents('api::notice.notice').count({});

      if (count === 0) {
        // @ts-ignore - Types are not generated yet
        await strapi.documents('api::notice.notice').create({
          data: {
            title: 'Welcome Notice',
            content: 'This is a sample notice created by the bootstrap function.',
            date: new Date().toISOString().split('T')[0],
            isNew: true,
            publishedAt: new Date(),
          },
        });
        strapi.log.info('[Bootstrap] Created sample notice');
      }

    } catch (e) {
      strapi.log.error('Bootstrap error: ', e);
    }
  },
};
