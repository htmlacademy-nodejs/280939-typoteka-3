'use strict';

const {Router} = require(`express`);
const {HttpCodes} = require(`../../../../config/constants`);
const {
  validate,
  rules,
} = require(`../../validation`);
const {catchAsync} = require(`../../../utils/utils`);

const router = (api) => {
  const categoriesRouter = new Router();

  categoriesRouter.get(`/`, catchAsync(async (req, res) => {
    const data = await api.categories.getAll();
    return res.status(HttpCodes.OK).json(data);
  }));

  categoriesRouter.get(`/:id`, catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = await api.categories.findById(id);
    return res.status(HttpCodes.OK).json(data);
  }));

  categoriesRouter.post(`/`, rules.category(api), validate, catchAsync(async (req, res) => {
    const data = await api.categories.add(req.body);
    return res.status(HttpCodes.OK).json(data);
  }));

  categoriesRouter.put(`/:id`, rules.category(api), validate, catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = await api.categories.edit(id, req.body);
    return res.status(HttpCodes.OK).json(data);
  }));

  categoriesRouter.delete(`/:id`, catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = await api.categories.delete(id);
    return res.status(HttpCodes.OK).json(data);
  }));

  categoriesRouter.get(`/categories/my`, catchAsync(async (req, res) => {
    const data = await api.categories.getAll();
    return res.status(HttpCodes.OK).json(data);
  }));

  categoriesRouter.get(`/categories/count`, catchAsync(async (req, res) => {
    const data = await api.categories.getCategoriesCount();
    return res.status(HttpCodes.OK).json(data);
  }));

  return categoriesRouter;
};

module.exports = router;
