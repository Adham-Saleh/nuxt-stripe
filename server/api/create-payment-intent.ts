import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);

  const { amount } = await readBody(event);
  console.log(amount);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  console.log(paymentIntent.client_secret);

  return {
    clientSecret: paymentIntent.client_secret,
  };
});
