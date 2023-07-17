/* eslint-disable @typescript-eslint/no-var-requires */
const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
// Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env'
  });
// `environment.ts` file structure
console.log(`environment - ${process.env}`);
  const envConfigFile = `export const environment = {
    title: '${process.env["TITLE"]}',
    apiUrl: '${process.env["API_URL"]}',
  };
`;
  console.log('The file `environment.ts` will be written with the following content: \n');
  console.log(envConfigFile);
  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv();


// "build": "npm run config && ng build",
// "config": "ts-node src/environments/set-env.ts",
