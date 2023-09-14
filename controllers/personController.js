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