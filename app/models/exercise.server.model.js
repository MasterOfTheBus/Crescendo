var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    book: String,
    scale: String,
    exercise: String,
    name: String,
});

mongoose.model('Exercise', ExerciseSchema);
