const asyncHandler= require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc Get all contacts
//@rote Get /api/contacts
//@access private

const getContacts= asyncHandler(async (req, res) => {
        const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Get  contact
//@rote Get /api/contacts/:id
//@access private

const getContact= asyncHandler(async(req, res) => {
    const contact = await Contact.findById((req.params.id));
    if(!contact){
        res.status(400);
        throw new Error("Cannot be found")
    }
    res.status(200).json(contact);
});

//@desc creat new contacts
//@rote POST /api/contacts
//@access private

const creatContact= asyncHandler(async(req, res) => {
    console.log("The request body is : ",req.body);
    const {name,email,phone} = req.body;
    if (!name || !email || !phone){
       res.status(400);
        throw new Error("All fields are madatory!")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(200).json(contact);;
});



//@desc update contact
//@rote PUT /api/contacts/:id
//@access private

const updateContact= asyncHandler(async (req, res) => {
    const contact = await Contact.findById((req.params.id));
    if(!contact){
        res.status(400);
        throw new Error("Cannot be found")
    }

    if (contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("user dont have permision to update other contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

//@desc Delet contact
//@rote Delet /api/contacts/:id
//@access private

const deleteContact= asyncHandler(async(req, res) => {
    const contact = await Contact.findById((req.params.id));
    if(!contact){
        res.status(400);
        throw new Error("Cannot be found")
    }

    if (contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("user dont have permision to update other contacts");
    }
    
    const removeContact = await Contact.deleteOne({ _id: req.params.id });


    res.status(200).json(contact);
});


module.exports = {
    getContact,
    getContacts,
    creatContact, 
    updateContact,
    deleteContact
};