const ShoppingList = require("../models/shopping-list");
const { validationResult } = require("express-validator");

const getShoppingListById = async (req, res) => {
  try {
    const { listId } = req.params;

    const findList = await ShoppingList.findById(listId);

    if (!findList)
      return res.status(404).json({ success: false, data: "List not found!" });

    if (findList._doc.user.toString() !== req.user._id)
      return res.status(401).json({ success: false, data: "Unauthorized" });

    res.status(200).json({ success: true, data: findList._doc });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const createShoppingList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { name } = req.body;

    const newList = new ShoppingList({
      name,
      user: req.user._id,
      products: [],
    });

    await newList.save();
    res.status(201).json({ success: true, data: newList._doc });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const addItemToShoppingList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { listId, itemId } = req.body;

    const findList = await ShoppingList.findById(listId);

    if (!findList)
      return res.status(404).json({ success: false, data: "List not found!" });

    if (findList._doc.user.toString() !== req.user._id)
      return res.status(401).json({ success: false, data: "Unauthorized" });

    if (findList._doc.products.includes(itemId))
      return res.status(409).json({
        success: false,
        data: "This product is already in shopping list!",
      });

    const list = await ShoppingList.findByIdAndUpdate(
      listId,
      {
        $push: { products: itemId },
      },
      { new: true },
    );

    res.status(201).json({ success: true, data: list._doc });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const updateShoppingList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { listId, name, products } = req.body;

    const findList = await ShoppingList.findById(listId);

    if (!findList)
      return res.status(404).json({ success: false, data: "List not found!" });

    if (findList._doc.user.toString() !== req.user._id)
      return res.status(401).json({ success: false, data: "Unauthorized" });

    let updateObject = {};

    if (name) updateObject.name = name;
    if (products.length > 0) updateObject.products = products;

    const list = await ShoppingList.findByIdAndUpdate(listId, updateObject, {
      new: true,
    });

    res.status(200).json({ success: true, data: list._doc });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const deleteShoppingList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { listId } = req.body;

    const findList = await ShoppingList.findById(listId);

    if (!findList)
      return res.status(404).json({ success: false, data: "List not found!" });

    if (findList._doc.user.toString() !== req.user._id)
      return res.status(401).json({ success: false, data: "Unauthorized" });

    const list = await ShoppingList.findByIdAndDelete(listId);

    res.status(200).json({ success: true, data: list._doc });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const removeItemFromShoppingList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { listId, itemId } = req.body;

    const findList = await ShoppingList.findById(listId);

    if (!findList)
      return res.status(404).json({ success: false, data: "List not found!" });

    if (findList._doc.user.toString() !== req.user._id)
      return res.status(401).json({ success: false, data: "Unauthorized" });

    if (!findList._doc.products.includes(itemId))
      return res.status(404).json({
        success: false,
        data: "This product is already not exists in shopping list!",
      });

    const list = await ShoppingList.findByIdAndUpdate(
      listId,
      {
        $pull: { products: itemId },
      },
      { new: true },
    );

    res.status(200).json({ success: true, data: list._doc });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

module.exports = {
  getShoppingListById,
  createShoppingList,
  addItemToShoppingList,
  updateShoppingList,
  deleteShoppingList,
  removeItemFromShoppingList,
};
