'use strict';

/**
 * Mindmap.js controller
 *
 * @description: A set of functions called "actions" for managing `Mindmap`.
 */

module.exports = {

  /**
   * Retrieve mindmap records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.mindmap.fetchAll(ctx.query);
  },

  /**
   * Retrieve a mindmap record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.mindmap.fetch(ctx.params);
  },

  /**
   * Create a/an mindmap record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.mindmap.add(ctx.request.body);
  },

  /**
   * Update a/an mindmap record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.mindmap.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an mindmap record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.mindmap.remove(ctx.params);
  }
};
