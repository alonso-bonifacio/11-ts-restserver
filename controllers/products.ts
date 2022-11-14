import { Request, Response } from "express";
import { Op } from "sequelize";
import Product from "../models/product";


export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();

  res.json({ products });
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      msg: `No existe un producto con el id ${id}`,
    });
  }
};

export const getProductByName = async(req: Request, res: Response) => {
  const { name } = req.params;

  const products = await Product.findAll({
    where: {
      name: {[Op.substring]: name}
    }
  });

  console.log(products);

  if (products.length > 0) {
    res.json({products});
  } else {
    res.status(404).json({
      msg: `No existe un producto con el nombre: ${name}`,
    });
  }
}

export const postProduct = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeName = await Product.findOne({
      where: {
        name: body.name,
      },
    });

    if (existeName) {
      return res.status(400).json({
        msg: "Ya existe un producto con el nombre " + body.name,
      });
    }

    const product = Product.build(body);
    await product.save();

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        msg: "No existe un producto con el id " + id,
      });
    }

    await product.update(body);

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      msg: "No existe un producto con el id " + id,
    });
  }

  await product.destroy();  // Eliminación física

  res.json(product);
};
