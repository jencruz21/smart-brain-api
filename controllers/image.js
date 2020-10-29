const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "34293e6422ef453fa140f3e4dcb25e70"
});

//imageAPICall api
const handleApiCall = (req, res) => {
app.models
   .predict(FACE_DETECT_MODEL, this.state.input)
   .then(data => {
       res.json(data);
   })
   .catch(err => res.status(400).json("Unable to work with API."));
}

//image api
const handleImage = (db) => (req, res) => {

const { id } = req.body;
db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => {
        res.status(400).json("Unable to get entries")
    });
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};
