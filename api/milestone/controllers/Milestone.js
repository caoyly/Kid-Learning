'use strict';

/**
 * Milestone.js controller
 *
 * @description: A set of functions called "actions" for managing `Milestone`.
 */

module.exports = {

  /**
   * Retrieve milestone records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.milestone.fetchAll(ctx.query);
  },

  /**
   * Retrieve a milestone record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.milestone.fetch(ctx.params);
  },

  /**
   * Create a/an milestone record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.milestone.add(ctx.request.body);
  },

  /**
   * Update a/an milestone record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.milestone.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an milestone record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.milestone.remove(ctx.params);
  }
};
