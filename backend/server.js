const express = require('express');
const cors = require("cors");
const pokemonRoutes = require("./routes/pokemonRoutes");
const gymRoutes = require("./routes/gymRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const deckRoutes = require("./routes/deckRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api/gym", gymRoutes);
app.use("/api/deck", deckRoutes)

app.listen(5000, () => console.log('Server running on port 5000'));