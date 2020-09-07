'use strict';

const path = require(`path`);
const multer = require(`multer`);
const fsFromises = require(`fs`).promises;
const {
  ARTICLE_IMG_PREFIX,
  AVATAR_IMG_PREFIX,
  PATH_TO_TMP,
  PATH_TO_PUBLIC,
} = require(`../../config/constants`);
const {isFileExistsAsync} = require(`../utils/utils`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH_TO_TMP);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
  },
});

const upload = multer({storage});

const articleImgUploadMiddleware = upload.single(ARTICLE_IMG_PREFIX);

const userImgUploadMiddleware = upload.single(AVATAR_IMG_PREFIX);

const addFile = (req, data) => {
  if (req.file) {
    data.file = req.file;
  }
};

const saveFile = async (req, pathPrefix, fieldNames, deletePrevFileCb) => {
  if (req.body.file) {
    const {file} = req.body;
    const backendFilePath = `${pathPrefix}/${file.filename}`;
    if (deletePrevFileCb) {
      await deletePrevFileCb();
    }
    await fsFromises.rename(
      file.path,
      PATH_TO_PUBLIC + backendFilePath,
    );
    delete req.body.file;
    fieldNames.forEach((fieldName) => {
      req.body[fieldName] = backendFilePath;
    });
  } else if (req.body._prevImg) {
    delete req.body._prevImg;
    fieldNames.forEach((fieldName) => {
      req.body[fieldName] = ``;
    });
    if (deletePrevFileCb) {
      await deletePrevFileCb();
    }
  }
};

const deletePrevArticleImg = async (api, id) => {
  const prevArticle = await api.articles.findById(id);
  if (prevArticle.img) {
    const pathToPrevFile = `${PATH_TO_PUBLIC}${prevArticle.img}`;
    const isExists = await isFileExistsAsync(pathToPrevFile);
    if (isExists) {
      await fsFromises.unlink(pathToPrevFile);
    }
  }
};

module.exports = {
  articleImgUploadMiddleware,
  userImgUploadMiddleware,
  addFile,
  saveFile,
  deletePrevArticleImg,
};
