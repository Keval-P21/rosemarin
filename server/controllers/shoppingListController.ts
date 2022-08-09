const ShoppingListItem = require('../models/ShoppingListItem');
import { Request, Response } from 'express';
// const { Request, Response } = require('express');

const addItem = async (req: Request, res: Response) => {
  console.log(req.session.sid);
  try {
    const result = await ShoppingListItem.create({
      name: req.body.name,
      unit: req.body.unit,
      quantity: req.body.quantity,
      userId: req.session.sid,
    });
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Due to error item has not been added' });
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await ShoppingListItem.destroy({ where: { id: id } });
    await ShoppingListItem.create({
      name: req.body.name,
      unit: req.body.unit,
      quantity: req.body.quantity,
      userId: req.session.sid,
    });
    res.status(200).send({ message: 'Item has been successfully updated' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Due to error item has not been updated' });
  }
};

const removeItem = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    await ShoppingListItem.destroy({ where: { id: id } });
    res.status(200).send({ message: 'Item has been successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Due to error item has not been deleted' });
  }
};

const getAllItems = async (req: Request, res: Response) => {
  try {
    const userId = req.session.sid;
    const allItems = await ShoppingListItem.findAll({
      where: { userId: userId },
    });
    res.status(200).send(allItems);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: 'Due to error items have not been received' });
  }
};

module.exports = { addItem, removeItem, updateItem, getAllItems };
