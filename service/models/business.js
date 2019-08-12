const mongoose = require('mongoose')

const business_schema = new mongoose.Schema({

    ID: { type: Number, index: 1, required: true },
	Name: { type: String, required: true },
	Service: { type: String, required: true },
	Location: {
		Lat: { type: Number, required: true },
		Lon: { type: Number, required: true },
		Address: { type: String, required: true }
	},
	Availability: {
		Sunday:     { type: String, required: true },
		Monday:     { type: String, required: true },
		Tuesday:    { type: String, required: true },
		Wednesday:  { type: String, required: true },
		Thursday:   { type: String, required: true },
		Friday:     { type: String, required: true },
		Saturday:   { type: String, required: true }
	},
	Ranking: { type: Number, min: 0, max: 5, required: true },
	Description: { type: String, required: true },
	Phone: { type: String, required: true },
	Website: { type: String, required: true },
	Tags: { type: [String], required: true },
	Services: { type: [Object], required: true },
	Pictures: {
		Avater: { type: String, required: true },
		Favorite: { type: String, required: true },
		Carousel: { type: [String], required: true }
	}

})

module.exports = mongoose.model('businesses', business_schema)