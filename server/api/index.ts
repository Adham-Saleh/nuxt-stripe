// import { defineEventHandler } from "h3";
import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const { cart } = await readBody(event);
  const stripe = await useServerStripe(event);

  // const prices = await stripe.prices.list({
  //   product: lookupKey,
  // });

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [...cart],
    // payment_method_types: ['card'],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  if (session.url) {
    return {
      url: session.url,
    };
  }

  return {
    error: "Something went wrong",
  };
});

// export default defineEventHandler(async (event) => {
//     const stripe = await useServerStripe(event);
//     const orderAmount = 1400;
//     let paymentIntent;

//     try {
//       paymentIntent = await stripe.paymentIntents.create({
//         currency: "usd",
//         amount: orderAmount,
//         automatic_payment_methods: { enabled: true },
//       });

//       return {
//         clientSecret: paymentIntent.client_secret,
//         error: null,
//       };
//     } catch (e) {
//       return {
//         clientSecret: null,
//         error: e,
//       };
//     }
//   });
