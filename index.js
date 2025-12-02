const {initializeDatabase} = require("./db/db.connect")
const fs = require("fs")
const Meetup = require("./model/meetup.model")
const express = require("express")
initializeDatabase();

const app = express()
app.use(express.json())

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const jsonData = fs.readFileSync('meetup.json',"utf-8")

// const meetupsData =JSON.parse(jsonData)

// function seedData(){

//     try{
//         for(const meetupData of meetupsData){
//             const newMeetup = new Meetup({

//         eventName: meetupData.eventName,
//         hostName: meetupData.hostName,
//         eventImg: meetupData.eventImg,
//         eventDetails: meetupData.eventDetails,
//         dressCode: meetupData.dressCode,
//         ageRestriction: meetupData.ageRestriction,
//         eventTags: meetupData.eventTags,
//         eventDayAndTime: meetupData.eventDayAndTime,
//         eventLocation: meetupData.eventLocation,
//         price: meetupData.price,
//         speakerName: meetupData.speakerName,
//         speakerDesignation: meetupData.speakerDesignation,
//         speaker: meetupData.speaker

//             })

//            newMeetup.save();
//         }
//     }catch(error){

//         console.log("Error seeding the data" ,error)
//     }
// }

// seedData()


async function readAllMeetups(){

    try{

        const meetup = await Meetup.find()
        return meetup


    }catch(error){

        throw error
    }
}

app.get("/meetups",async(req,res)=>{

    try{
        const allMeetups = await readAllMeetups()
        if(allMeetups){

            res.json(allMeetups)
        }else{

            res.status(404).json({error : "No Event found"})
        }



    }catch(error){
        res.status(500).json({error : "Unable to fetch data"})
    }
})

async function getEventById(eventID) {

    try{

        const findEvent = await Meetup.find({_id : eventID})
        return findEvent


    }catch(error){

        throw error
    }
    
}

app.get("/events/:eventID",async(req,res)=>{

    try{

        const eventByID= await getEventById(req.params.eventID)
        if(eventByID){

            res.json(eventByID)

        }else{

            res.status(404).json({error : "No event found by requested name"})

        }

    }catch(error){

        res.status(500).json({error : "Unable to fetch event data"})
    }



})

async function getEventByTitle(eventTitle){

    try{
        const eventData = await Meetup.findOne({ eventName : eventTitle})

        return eventData
    }catch(error){

        throw error
    }
}


app.get("/events/eventTitle/:title", async(req,res)=>{

    try{

        const eventData = await getEventByTitle(req.params.title)

        if(eventData){

            res.status(200).json({event : eventData})
        }else{

            res.status(404).json({error : "event not found"})
        }



    }catch(error){

        res.status(500).json({error : "failed to get the data"})
    }
})




PORT = process.env.PORT

app.listen(PORT ,()=>{

    console.log(`Server is running at port ${PORT}`)
})