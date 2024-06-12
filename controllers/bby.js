const { validationResult } = require("express-validator");
const bby = require("bestbuy")({
  key: process.env.BESTBUY_API_KEY,
  maxRetries: 10,
  retryInterval: 5,
});

const searchProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { query, page } = req.body;

    bby
      .products(`name='${query}*'`, {
        show: "sku,salePrice,longDescription,name,image",
        sort: "salePrice.desc",
        pageSize: 20,
        page,
      })
      .then((data) => {
        if (data.products.length > 0) {
          res.status(200).json({ success: true, data: data });
        } else {
          res.status(404).json({ success: false, data: "Product not found!" });
        }
      })
      .catch((e) => {
        res.status(500).json({ success: false, data: e.message });
      });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const getProductById = (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ success: false, data: "ID is required" });

    bby
      .products(`sku in (${id})`, {
        show: "sku,salePrice,name,longDescription,image",
      })
      .then((data) => {
        if (data.products.length > 0) {
          res.status(200).json({ success: true, data: data.products });
        } else {
          res.status(404).json({ success: false, data: "Product not found!" });
        }
      })
      .catch((e) => {
        res.status(500).json({ success: false, data: e.message });
      });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

module.exports = {
  getProductById,
  searchProduct,
};
