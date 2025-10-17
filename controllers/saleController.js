import Sale from "../models/Sale.js";
// Get All Sale
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get Sales",
    });
  }
};

// Get One Sale
const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        error: "sale not found",
      });
    }

    res.json({
      success: true,
      data: sale,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sale ID format",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to receive the sale",
    });
  }
};

// Create Sale
const createSale = async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    const savedSale = await newSale.save();
    res.status(201).json({
      message: "Sale created successfully",
      sale: savedSale,
    });
  } catch (error) {
    if (error.name === "validationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Sale already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update Sale
const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sale) {
      return res.status(404).json({
        success: false,
        error: "Sale not found",
      });
    }

    res.json({
      success: true,
      data: sale,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sale ID format",
      });
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to update sale",
    });
  }
};

const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        error: "Sale not found",
      });
    }

    res.json({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sale ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete sale",
    });
  }
};

export { getAllSales, getSaleById, createSale, updateSale, deleteSale };
