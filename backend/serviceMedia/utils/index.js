const fs = require("fs");
const path = require("path");

exports.SaveDataToFile = (data, directory) => {
  const extension = data.split(";")[0].split("/")[1];
  const base64Data = data.split(",")[1];
  const pathName = path.join(__dirname, `../public/${directory}`);
  const fileName = new Date().getTime();
  fs.writeFile(
    `${pathName}/${fileName}.${extension}`,
    base64Data,
    "base64",
    (err) => {
      return err;
    }
  );
  return `${fileName}.${extension}`;
};

exports.DeleteFile = (fileName, directory) => {
  const pathName = path.join(__dirname, `../public/${directory}/${fileName}`);
  fs.unlink(pathName, (err) => {
    if (err) {
      return err.message;
    }
  });
  return "success";
};
