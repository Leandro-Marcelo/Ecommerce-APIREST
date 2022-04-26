/* CONFIGURAR DOTENV */

const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const config = require("./config");

//Importando routers
const auth = require("./routes/auth");
const payments = require("./routes/payments");

const app = express();

app.use(express.json());
/*    "http://192.168.1.100:3000", */
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://192.168.1.100:3000",
            "https://leandro-marcelo.github.io",
            "http://localhost:5500",
            /* También habría que agregar el 192.168.100..... */
        ],
        credentials: true,
    })
);

app.use(cookies());

// Conexión con la base de datos
const { connection } = require("./config/db");
connection();

// Utilizando las rutas
auth(app);
payments(app);

app.get("/", (req, res, next) => {
    return res.status(200).json({ lean: "leandro" });
});

app.listen(config.port, () => {
    console.log("Modo:", config.env);
    console.log("listening on: http://localhost:" + config.port);
});
