'use strict';

/**
 * Grade.js controller
 *
 * @description: A set of functions called "actions" for managing `Grade`.
 */

module.exports = {

  /**
   * Retrieve grade records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.grade.fetchAll(ctx.query);
  },

  /**
   * Retrieve a grade record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.grade.fetch(ctx.params);
  },

  /**
   * Create a/an grade record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.grade.add(ctx.request.body);
  },

  /**
   * Update a/an grade record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.grade.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an grade record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.grade.remove(ctx.params);
  }
};
