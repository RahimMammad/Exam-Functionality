import ProductModel from "../models/ProductModel.js"

export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({})
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
        })
        product.save()
        res.status(200).send("Add")
    } catch (error) {
        res.status(500).sedn(error)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id)
        if(product) {
            product.name = req.body.name,
            product.description = req.body.description,
            product.price = req.body.price,
            product.image = req.body.image
        }
        product.save()
        res.status(200).send({msg: "Update"})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Delete")
    } catch (error) {
        res.status(500).send(error)
    }
}