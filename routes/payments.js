const express = require("express");
const Payments = require("../services/payments");

function auth(app) {
    const router = express.Router();
    const paymentsService = new Payments();
    /* en los anteriores proyectos no he utilizado el api, pero es bastante común */
    app.use("/api/payments", router);

    /* el payment intent. Una sesión de pagos es como decirle a stripe que nos registre que alguien va a realizar un   pago o es posible que alguien vaya a realizar un pago, es como un inicio de sesión, es decir, generar una sesión entre la persona que va a realizar el pago y stripe para que podamos saber de cuanto es la cantidad a cobrar, los elementos que se van a cobrar, ya todo  */
    router.post("/intent", async (req, res) => {
        const { amount } = req.body;
        console.log(amount);
        /* podríamos hacerlo de varias maneras, que directamente el fontend nos pase el precio total del carrito de compras o lo otro sería guardar el carrito de compras del usuario en la base de datos y que ya nos pase el id del usuario y nosotros mismos calculamos la cantidad, porque eso podría cambiarse, para mas seguridad consultar los directamente de ese usuario */
        const intent = await paymentsService.createIntent(amount);

        return res.status(200).json({ clientSecret: intent });
    });
}

module.exports = auth;
