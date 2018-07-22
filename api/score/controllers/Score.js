'use strict';

/**
 * Score.js controller
 *
 * @description: A set of functions called "actions" for managing `Score`.
 */

module.exports = {

  /**
   * Retrieve score records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.score.fetchAll(ctx.query);
  },

  /**
   * Retrieve a score record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.score.fetch(ctx.params);
  },

  /**
   * Create a/an score record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.score.add(ctx.request.body);
  },

  /**
   * Update a/an score record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.score.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an score record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.score.remove(ctx.params);
  }
};
