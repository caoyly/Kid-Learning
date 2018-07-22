'use strict';

/**
 * Chapter.js controller
 *
 * @description: A set of functions called "actions" for managing `Chapter`.
 */

module.exports = {

  /**
   * Retrieve chapter records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.chapter.fetchAll(ctx.query);
  },

  /**
   * Retrieve a chapter record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.chapter.fetch(ctx.params);
  },

  /**
   * Create a/an chapter record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.chapter.add(ctx.request.body);
  },

  /**
   * Update a/an chapter record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.chapter.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an chapter record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.chapter.remove(ctx.params);
  }
};
