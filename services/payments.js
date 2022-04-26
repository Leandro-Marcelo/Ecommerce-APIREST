const { stripe_sk } = require("../config");
const stripe = require("stripe")(stripe_sk);
class Payments {
    async createIntent(amount) {
        const intent = await stripe.paymentIntents.create({
            /* el precio a cobrar */
            amount,
            /* el tipo de moneda */
            currency: "usd",
        });
        /* cuando alguien compra algo con stripe, este genera un cliente (velo como un _id, es decir, un _id de la compra), este usuario puede ser de una sola ocación  */
        return intent.client_secret;
    }
}

module.exports = Payments;
