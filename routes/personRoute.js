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
router.get("/person/byName/:name", getPersonByName);
router.put("/person/:name", updatePersonByName);
router.delete("/person/:name", deletePersonByName);

module.exports = router;