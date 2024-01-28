const Brand = require("../models/brand");

const _brand = {}

_brand.create = async (req,res)=>{
        const {name} = req.body;
        const image = req.file
        const brand= {name, image: image.path};
        const brandDetails = await Brand.create(brand);
        return res.status(201).json(brandDetails);
    };

module.exports = _brand;