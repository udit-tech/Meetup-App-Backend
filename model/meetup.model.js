const mongoose = require("mongoose")
const { type } = require("os")

const meetupSchema = new mongoose.Schema({

        eventName: {
        type: String,
        required: true 
    },
    hostName: {
        type: String,
        required: true 
    },
    eventType : {
        type: String,
        required :true

    },
    eventImg:{

        type : String,
        required : true
    },
    eventDetails :{

        type : String,
        required : true,

    },

    dressCode: {

        type : String,
        required : true,
    },
    ageRestriction : {

        
        type : String,
        required : true,

    },
    eventTags : [{

        type : String,
        enum : ["marketing","digital","business"],
        required : true
    }],
    eventDayAndTime : {

        type : String,
        required : true,

    },
    eventLocation : {

        type : String,
        required : true
    },
    price : {

        type : String,
        required : true,
    },
    speakerName : [{


        type : String,
        required : true,
    }],
    speakerDesignation : [{

        type : String,
        required : true


    }],
    speaker : [{

        name: String,
        designation: String,
        image: String
    }]

}, { timestamps: true })

const Meetup = mongoose.model("Meetup", meetupSchema)

module.exports = Meetup