const Supplier = require("../models/Supplier");

// =======================
// ADD SUPPLIER
// =======================

exports.addSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.create(req.body);

        res.status(201).json({

            success: true,

            message: "Supplier Added Successfully",

            supplier

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
// =======================
// GET ALL SUPPLIERS
// =======================

exports.getSuppliers = async (req, res) => {

    try {

        const suppliers = await Supplier.find();

        res.status(200).json({

            success: true,

            count: suppliers.length,

            suppliers

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
// =======================
// GET SINGLE SUPPLIER
// =======================

exports.getSupplier = async (req,res)=>{

    try{

        const supplier = await Supplier.findById(req.params.id);

        if(!supplier){

            return res.status(404).json({

                success:false,

                message:"Supplier Not Found"

            });

        }

        res.status(200).json({

            success:true,

            supplier

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
// =======================
// UPDATE SUPPLIER
// =======================

exports.updateSupplier = async (req,res)=>{

    try{

        const supplier = await Supplier.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );

        res.status(200).json({

            success:true,

            message:"Supplier Updated Successfully",

            supplier

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
// =======================
// DELETE SUPPLIER
// =======================

// =======================
// DELETE SUPPLIER
// =======================

exports.deleteSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {

            return res.status(404).json({

                success: false,

                message: "Supplier Not Found"

            });

        }

        await Supplier.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Supplier Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};