const ErrorResponse = require("../utils/ErrorResponse");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res, next) => {
  console.log("체크아웃 세션");
  const { cartItems, email } = req.body;
  //id, name, img, price, qty
  console.log({ cartItems, email });

  const transformedItems = cartItems.map((item) => ({
    // description: item.description,
    quantity: item.qty,
    price_data: {
      currency: "krw",
      unit_amount: item.price,
      product_data: {
        name: item.name,
        // images: [item.img],
      },
    },
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1L15llKLJc8TEAv2z8ZZs642"],
      shipping_address_collection: {
        allowed_countries: ["KR", "GB", "US", "CA"],
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/cart`,
      metadata: {
        email,
        images: JSON.stringify(cartItems.map((item) => item.img)),
      },
    });
    console.log(session.url);

    res.json({ url: session.url });
  } catch (err) {
    return next(new ErrorResponse(err, 500));
  }
};
