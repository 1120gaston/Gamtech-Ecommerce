"use server";

import { CartProduct } from "@/providers/cart";
import Stripe from "stripe";

export const createCheckout = async (products: CartProduct[], orderId: string) => {
  // ?Create checkout
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://gamtech.vercel.app/orders",
    cancel_url: "https://gamtech.vercel.app/",
    metadata: {
      orderId,
    },
    line_items: products.map((product) => {
      return {
        unit_amount: product.totalPrice * 100,
        quantity: product.quantity,
      };
    }),
  });

  // ?Return checkout
  return checkout;
};
