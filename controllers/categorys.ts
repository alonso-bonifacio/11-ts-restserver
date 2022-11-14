import { Request, Response } from "express";
import Category from "../models/category";

export const getCategorys = async (req: Request, res: Response) => {
  const categorys = await Category.findAll({
    order: ['name']
  });

  res.json({ categorys });
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({
      msg: `No existe una categoria con el id ${id}`,
    });
  }
};

export const postCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeName = await Category.findOne({
      where: {
        name: body.name,
      },
    });

    if (existeName) {
      return res.status(400).json({
        msg: "Ya existe una categoria con el nombre " + body.name,
      });
    }

    const category = Category.build(body);
    await category.save();

    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        msg: "No existe una categoria con el id " + id,
      });
    }

    await category.update(body);

    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({
      msg: "No existe una categoria con el id " + id,
    });
  }

  await category.destroy(); // Eliminación física

  res.json(category);
};
