const express = require("express");
const cors = require("cors");
//const session = require("express-session");
const OwnerRoutes = require("./routes/owners");
const BhRoutes = require("./routes/boardinghouses");
const AdminRoutes = require("./routes/admin");
const SeekerRoutes = require("./routes/seekers");
const RoomsRoutes = require("./routes/rooms");
const BookmarksRoutes = require("./routes/bookmarks");
const ReviewsRoutes = require("./routes/reviews");
const StarRoutes = require("./routes/stars");
const PdfRoutes = require("./routes/pdf");

require("dotenv").config();

const app = express();
const fallbackPort = 3500;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//problem with production not available in free
//app.use(
//session({
//secret: "secret",
//resave: true,
//saveUninitialized: true,
//})
//);

// routers
app.use("/api/owners", OwnerRoutes);
app.use("/api/boarding-houses", BhRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/seekers", SeekerRoutes);
app.use("/api/rooms", RoomsRoutes);
app.use("/api/bookmarks", BookmarksRoutes);
app.use("/api/reviews", ReviewsRoutes);
app.use("/api/stars", StarRoutes);
app.use("/api/pdf", PdfRoutes);

app.use("/room-images", express.static("room-images"));
app.get("/", (req, res) => {
   res.send([
      {
         info: "Capstone Project",
         title: "Search 'n Stay: Boarding House Finder",
         members: ["Melvin Dionisio", "Ivan Joseph Arang", "Jhelan Anabo"],
      },
   ]);
});

app.listen(process.env.PORT || fallbackPort, () => {
   console.log(`🚀 Server started at http://localhost:${fallbackPort}`);
});
