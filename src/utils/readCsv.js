export const readCsv = (csvFile) =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsText(csvFile);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
