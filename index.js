const express = require(`express`);
const apiRoutes = require(`./routers/indexRoutes`);

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.static(`public`));

// Routes
app.use(`/api`, apiRoutes)

const connectedServer = app.listen(PORT, ()=> {
  console.log(`Conexión al puerto ${PORT}`);
});

connectedServer.on(`error`, (error) => {
  console.error(`Error: `, error);
})
