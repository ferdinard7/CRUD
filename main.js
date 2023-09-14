const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", require("./routes/personRoute"));



app.listen(PORT, () => {
    console.log(`server is up nd running on port ${PORT}`)
} )


const express = require("express");
const { getPerson, addNewPerson, updatePerson, deletePerson, getPersonByName, updatePersonByName, deletePersonByName } = require("../controllers/personController");
const router = express.Router();

// ADD NEW NAME
router.post("/", addNewPerson);

// FETCH DETAILS OF ONE PERSON BY ID
router.get("/:id", getPerson);

// UPDATE A PERSON NAME BY ID
router.put("/:id", updatePerson);

// DELETE A PERSON BY ID
router.delete("/:id", deletePerson);

// GETTING USERS BY NAME
router.get("/person/:name", getPersonByName);
router.put("/person/:name", updatePersonByName);
router.delete("/person/:name", deletePersonByName);

module.exports = router;

const mongoose = require("mongoose");


const PersonSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
},
     {
    timestamps: true,
     
})


module.exports = mongoose.model("Person", PersonSchema);

const mongoose = require("mongoose");

const connectDb = async () => {
    try {
      const connect = await mongoose.connect(process.env.CONNECTION_STRING);
      console.log("Database connected:", connect.connection.host, connect.connection.name)
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;


const Person = require("../models/personModel");


// CREATE -- ADDING A NEW NAME


 const addNewPerson = async (req, res) => {
      const { name } = req.body;
      try {

         const nameAvailable = await Person.findOne({name});
         if(nameAvailable) {
             res.status(400).json({ message: "Name already exist, please Choose a new one!"});
    
         }
   

         const newName = new Person({
             name,
      })

      const saveName = await newName.save();
           res.status(200).json(saveName);

      } catch(err) {
         console.log(err);

      } 
   }


const getPerson = async(req, res) => {

    try {
        const person = await Person.findById(req.params.id);
        const { ...others} = person._doc;

        if (!person) {
            return res.status(404).json({ message: "Person is not found or does not exist!" });
          }
   
   
        res.status(200).json(others);
   
     } catch (err) {
       res.status(500).json(err);
       console.log(err);
     }
}


// UPDATE PERSON NAME

const updatePerson = async (req, res) => {
    const { id } = req.params; 
    const { name } = req.body;

    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { _id: id },
            { $set: { name } },
            { new: true }
        );

        if (!updatedPerson) {
            return res.status(404).json({ message: "Person not found" });
        }

        res.status(200).json(updatedPerson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deletePerson = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedPerson = await Person.findOneAndDelete({ _id: id });

        if (!deletedPerson) {
            return res.status(404).json({ message: "Person not found" });
        }

        res.status(200).json({ message: "Person deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const getPersonByName = async (req, res) => {
    const { name } = req.params;

    try {
        const person = await Person.findOne({ name });

        if (!person) {
            return res.status(404).json({ message: "Person not found" });
        }

        res.status(200).json(person);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a person's name by name
const updatePersonByName = async (req, res) => {
    const { name } = req.params;
    const { newName } = req.body;

    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name },
            { $set: { name: newName } },
            { new: true }
        );

        if (!updatedPerson) {
            return res.status(404).json({ message: "Person not found" });
        }

        res.status(200).json(updatedPerson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a person by name
const deletePersonByName = async (req, res) => {
    const { name } = req.params;

    try {
        const deletedPerson = await Person.findOneAndDelete({ name });

        if (!deletedPerson) {
            return res.status(404).json({ message: "Person not found" });
        }

        res.status(200).json({ message: "Person deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    addNewPerson,
    getPerson,
    updatePerson,
    deletePerson,
    updatePersonByName,
    getPersonByName,
    deletePersonByName,
}