'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require('stripe')('sk_test_Xix1Qd20RbMlFI6P334IpQrr');

module.exports = {



  create: async ctx => {

    const {name, total, items, stripeTokenId} = ctx.request.body;
    const {id} = ctx.state.user;

    const charge = await strapi.charges.create(
      {
        amount: Math.round(total * 100),
        currency: "usd",
        source: stripeTokenId,
        description: `Order ${new Date()} by ${ctx.state.user.username}`
      }
    );

    const order =  await  strapi.services.order.create({
      name,
      total,
      items,
      user: id
    });

    return  order;
  }

};
