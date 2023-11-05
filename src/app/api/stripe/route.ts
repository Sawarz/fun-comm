import { Product } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const calculateOrderAmount = (items: Array<Product>) => {
  return 1400;
};

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16'
  });
  const { price, name } = await request.json();

  const dev = process.env.NODE_ENV !== 'production';

  const server = dev ? 'http://localhost:3000' : 'https://fun-comm.vercel.app';

  const paymentIntent = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'p24'],
    line_items: [
      {
        price_data: {
          currency: 'PLN',
          product_data: {
            name
          },
          unit_amount: price
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['PL']
    },
    mode: 'payment',
    success_url: `${ server }/payment?success=true`,
    cancel_url: `${ server }/payment?canceled=true`,
  });

  return NextResponse.json(
    {
      url: paymentIntent.url,
      shipping: paymentIntent.shipping_details
    }
  );
};