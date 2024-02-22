const mongoose = require('mongoose')

const Movie = mongoose.model('Movie', {
    title: String,
    duration: String,
    synopsis: String

})

module.exports = Movie