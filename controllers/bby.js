import BBY from "bestbuy";

const bby = BBY({
  key: process.env.BESTBUY_API_KEY,
});

export const searchProduct = (req, res) => {
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

export const getProductById = (req, res) => {
  try {
    const { id } = req.params;

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
