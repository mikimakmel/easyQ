const Business = require('../models/business')

module.exports = {

    async getAllBusinesses(req, res) {
        console.log("getAllBusinesses()")

        const docs = await Business.find({})

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },
    async getBusinessByID(req, res) {
        console.log("getBusinessByID()")

        const businessID = req.params.id
        const docs = await Business.find({ ID: businessID })

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },
    async getBusinessByName(req, res) {
        console.log("getBusinessByName()")

        const businessName = req.params.name
        const docs = await Business.find({ Name: { "$regex": businessName, "$options": "i" } })

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },

}