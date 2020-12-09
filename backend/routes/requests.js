const router = require("express").Router();
let Request = require("../models/request.model");

router.route("/").get((req, res) => {
  Request.find()
    .then((requests) => res.json(requests))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const bed = req.body.bed;
  const description = req.body.description;
  const staff = req.body.staff;
  const date = Date.parse(req.body.date);
  const status = req.body.status;
  const completed = req.body.completed;

  const newRequest = new Request({
    name,
    bed,
    description,
    staff,
    date,
    status,
    completed,
  });

  newRequest
    .save()
    .then(() => res.json("Request added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Request.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  Request.findByIdAndDelete(req.params.id)
    .then(() => res.json("Request deleted."))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/update/:id").post((req, res) => {
  Request.findById(req.params.id)
    .then((request) => {
      request.name = req.body.name;
      request.bed = req.body.bed;
      request.description = req.body.description;
      request.staff = req.body.staff;
      request.date = Date.parse(req.body.date);
      request.status = req.body.status;
      request.completed = req.body.completed;

      request
        .save()
        .then(() => res.json("Request updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
