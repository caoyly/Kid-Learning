'use strict';

/**
 * School.js controller
 *
 * @description: A set of functions called "actions" for managing `School`.
 */

module.exports = {

  /**
   * Retrieve school records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.school.fetchAll(ctx.query);
  },

  /**
   * Retrieve a school record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.school.fetch(ctx.params);
  },

  /**
   * Create a/an school record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.school.add(ctx.request.body);
  },

  /**
   * Update a/an school record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.school.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an school record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.school.remove(ctx.params);
  }
};
