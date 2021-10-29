const express = require("express");
const cors = require("cors");
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

// routers
app.use("/api/owners", OwnerRoutes);
app.use("/api/boardinghouses", BhRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/users", SeekerRoutes);

app.listen(proccess.env.PORT || 3001, () => {
  console.log(`Server running `);
});
