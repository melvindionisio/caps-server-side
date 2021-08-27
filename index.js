const express = require("express");
const cors = require("cors");
const OwnerRoutes = require("./routes/owner");
const BhRoutes = require("./routes/boardinghouse");
const AdminRoutes = require("./routes/admin");

const port = 3030;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/api/owners", OwnerRoutes);
app.use("/api/boardinghouses", BhRoutes);
app.use("/api/admin", AdminRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
