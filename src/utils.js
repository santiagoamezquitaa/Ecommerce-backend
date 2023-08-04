import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker/locale/es";
import multer from "multer";

export const createhash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const generateProducts = () => {
  const randomNumber = faker.number.int({ min: 1000, max: 9999 });
  const timestamp = Date.now();
  const uniqueCode = parseInt(`${randomNumber}${timestamp}`, 10);

  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    code: uniqueCode,
    stock: faker.number.int(10),
    status: true,
    thumbnails: [],
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function determinarCarpetaDeDestino(req, file, cb) {
  let carpetaDestino = `${__dirname}/uploads`;

  if (file.fieldname === "fileProfilePicture") {
    carpetaDestino += "/profiles";
  } else if (file.fieldname === "fileProductPicture") {
    carpetaDestino += "/products";
  } else if (
    file.fieldname === "fileIdentification" ||
    file.fieldname === "fileAddress" ||
    file.fieldname === "fileStatementAccount"
  ) {
    carpetaDestino += "/documents";
  } else {
    return cb(new Error("Tipo de archivo no válido"));
  }

  cb(null, carpetaDestino);
}

const storage = multer.diskStorage({
  destination: determinarCarpetaDeDestino,
  filename: function (req, file, cb) {
    const newNameFile = `${req.session.user.id}-${file.originalname}`;
    cb(null, newNameFile);
  },
});

export const uploader = multer({ storage });
export default __dirname;
