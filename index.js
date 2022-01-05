const express = require("express");
const cors = require("cors");
const session = require("express-session");
const OwnerRoutes = require("./routes/owners");
const BhRoutes = require("./routes/boardinghouses");
const AdminRoutes = require("./routes/admin");
const SeekerRoutes = require("./routes/seekers");
const RoomsRoutes = require("./routes/rooms");
const BookmarksRoutes = require("./routes/bookmarks");
const ReviewsRoutes = require("./routes/reviews");

require("dotenv").config();

const app = express();
const fallbackPort = 3500;

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
app.use("/api/boarding-houses", BhRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/seekers", SeekerRoutes);
app.use("/api/rooms", RoomsRoutes);
app.use("/api/bookmarks", BookmarksRoutes);
app.use("/api/reviews", ReviewsRoutes);

app.get("/", (req, res) => {
  res.send([
    {
      capstoneProject: "Search 'n Stay: Boarding House Finder",
      members: ["Melvin Dionisio", "Ivan Joseph Arang", "Jhelan Anabo"],
    },
  ]);
});

app.listen(process.env.PORT || fallbackPort, () => {
  console.log(`Server running `);
});
