const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors());
const {initializeDatabase} = require("./db/db.connect");
const Hotel = require("./models/hotel.models");
app.use(express.json());
initializeDatabase();


// find to read all hotels from the database
async function readAllHotelsFromDb(){
    try{
        const allHotels = await Hotel.find();
        return allHotels;
    } catch(error){
        throw error;
    }
}

app.get("/hotels", async (req, res) => {
    try{
        const hotels = await readAllHotelsFromDb();
        if(hotels.length != 0){
            res.json(hotels);
        } else{
            res.status(404).json({error: "Hotels not found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Hotels."});
    }
});

// find to read a hotel by its name
async function readHotelByName(hotelName){
    try{
        const hotel = await Hotel.findOne({name: hotelName});
        return hotel;
    } catch(error){
        console.log(error);
    }
}

app.get("/hotels/:hotelName", async (req, res) => {
    try{
        const hotel = await readHotelByName(req.params.hotelName);
        if(hotel){
            res.json(hotel);
        } else{
            res.status(404).json({error: "Hotel not found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch hotel."});
    }
});

// find to read a hotel by its phone number
async function readHotelByPhoneNumber(phoneNum){
    try{
        const hotel = await Hotel.findOne({phoneNumber: phoneNum});
        return hotel;
    } catch(error){
        throw error;
    }
}

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
    try{
        const hotel = await readHotelByPhoneNumber(req.params.phoneNumber);
        if(hotel){
            res.json(hotel);
        } else{
            res.status(404).json({error: "Hotel not found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch hotel"});
    }
});

// find to read all hotels by rating
async function readAllHotelsByRating(hotelRating){
    try{
        const hotels = await Hotel.find({rating: hotelRating});
        return hotels;
    } catch(error){
        throw error;
    }
}

app.get("/hotels/rating/:hotelRating", async(req, res) => {
    try{
        const hotels = await readAllHotelsByRating(req.params.hotelRating);
        if(hotels.length != 0){
            res.json(hotels);
        } else{
            res.status(404).json({error: "Hotels not found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch hotels."});
    }
});

// find to read hotels by its category
async function readAllHotelsByCategory(hotelCategory){
    try{
        const hotels = await Hotel.find({category: hotelCategory});
        return hotels;
    } catch(error){
        console.log(error);
    }
}

app.get("/hotels/category/:hotelCategory", async (req, res) => {
    try{
        const hotels = await readAllHotelsByCategory(req.params.hotelCategory);
        if(hotels.length != 0){
            res.json(hotels);
        } else{
            res.status(404).json({error: "Hotels not found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch hotels."});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});