'use strict';

/**
 * Timeline.js controller
 *
 * @description: A set of functions called "actions" for managing `Timeline`.
 */

module.exports = {

  /**
   * Retrieve timeline records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.timeline.fetchAll(ctx.query);
  },

  /**
   * Retrieve a timeline record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.timeline.fetch(ctx.params);
  },

  /**
   * Create a/an timeline record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.timeline.add(ctx.request.body);
  },

  /**
   * Update a/an timeline record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.timeline.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an timeline record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.timeline.remove(ctx.params);
  }
};
