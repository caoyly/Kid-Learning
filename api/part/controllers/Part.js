'use strict';

/**
 * Part.js controller
 *
 * @description: A set of functions called "actions" for managing `Part`.
 */

module.exports = {

  /**
   * Retrieve part records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.part.fetchAll(ctx.query);
  },

  /**
   * Retrieve a part record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.part.fetch(ctx.params);
  },

  /**
   * Create a/an part record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.part.add(ctx.request.body);
  },

  /**
   * Update a/an part record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.part.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an part record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.part.remove(ctx.params);
  }
};
