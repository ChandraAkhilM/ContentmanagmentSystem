const express = require('express');
const router = express.Router(); // This is correct

const {getContact,
    getContacts,
    creatContact, 
    updateContact,
    deleteContact
}= require("../controllers/contactControllers");
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getContacts).post(creatContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
