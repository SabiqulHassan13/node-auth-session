// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51I07eyGSRvytMvOu5OgtiQsUgYgFlRrxD1lG5moPWXU1zHfk1bCvMv8wC5e3YPSuPrQbMS1wCQFJqlGLNCWURkGc00oqYixvOS"
);

function showPayDonation(req, res) {
  res.render("payment/donate");
}

function showPaySuccess(req, res) {
  res.render("payment/success");
}

function showPayCancel(req, res) {
  res.render("payment/cancel");
}

async function payCheckout(req, res) {
  //   console.log(req.body);
  //   const { product_name, pay_amount } = req.body;
  const { product } = req.body;

  const baseUrl = "http://127.0.0.1:5000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.amount * 100,
        },
        quantity: product.quantity,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/pay-success`,
    cancel_url: `${baseUrl}/pay-cancel`,
  });

  //   res.redirect(303, session.url);
  res.json({ id: session.id });
}

module.exports = {
  showPayDonation,
  showPaySuccess,
  showPayCancel,
  payCheckout,
};
