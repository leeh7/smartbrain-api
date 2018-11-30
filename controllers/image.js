const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '60ed287b43e5480d86d8f4a85ab49c43'
});

const handleAPICall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
}


const handleImage = (req, res, db) => {

    const { id } = req.body;
    //exit loop after sending response
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
};

module.exports = {
    handleImage,
    handleAPICall
}