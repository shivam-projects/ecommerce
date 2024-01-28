const Brand = require("../models/brand");

const _brand = {}

_brand.create = async (req,res)=>{
        const {name} = req.body;
        const images = req.file
        const bSave= {name};
        const brandDetails = await Brand.create(bSave);
        return res.send(brandDetails);
    };

module.exports = _brand;