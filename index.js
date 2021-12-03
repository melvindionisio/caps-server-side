const express = require("express");
const cors = require("cors");
const session = require("express-session");
const OwnerRoutes = require("./routes/owner");
const BhRoutes = require("./routes/boardinghouse");
const AdminRoutes = require("./routes/admin");
const SeekerRoutes = require("./routes/seeker");
require("dotenv").config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// routers
app.use("/api/owners", OwnerRoutes);
app.use("/api/boarding-house", BhRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/users", SeekerRoutes);
app.get("/", (req, res) => {
  res.send([
    {
      name: "Melvin Dionisio",
      age: 21,
    },
  ]);
});

app.listen(process.env.PORT || 3500, () => {
  console.log(`Server running `);
});
