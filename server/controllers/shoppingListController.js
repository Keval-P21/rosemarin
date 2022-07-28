const ShoppingListItem = require('../models/ShoppingListItem')

const addItem = async (req, res) => {
    try {
        await ShoppingListItem.create({
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity,
            // todo add here user id from session
            UserId: 1
        });
        res.status(201).send({"message": "Item has been successfully added"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error item has not been added"});
    }
}


const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await ShoppingListItem.destroy({where: {id: id}});
        await ShoppingListItem.create({
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity,
            // todo add here user id from session
            UserId: 1
        });
        res.status(200).send({"message": "Item has been successfully updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error item has not been updated"});
    }
}

const removeItem = async (req, res) => {
    try {
        const id = req.params.id;
        await ShoppingListItem.destroy({where: {id: id}});
        res.status(200).send({"message": "Item has been successfully deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error item has not been deleted"});
    }
}

const getAllItems = async (req, res) => {
    try {
        // todo add here user id from session
        const userId = 1;
        const allItems = await ShoppingListItem.findAll({where: {UserId: userId}});
        res.status(200).send(allItems);
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error items have not been received"})
    }
}


module.exports = {addItem, removeItem, updateItem, getAllItems}

