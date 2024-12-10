import * as fs from 'fs';
import * as path from 'path';

const fileExtentions = ['.js', '.ts', '.jsx', '.tsx'];

function processSourceCode(dirName) {
  
    // read the directory for files and directories
    fs.readdir(dirName, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            const fileExtention = path.extname(file);
            // check if the file is a source code file
            if(!fileExtentions.includes(fileExtention)) {
                return;
            }

            
            
            // get the file stats
            fs.stat(`${dirName}/${file}`, (err, stats) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (stats.isDirectory()) {
                    // if directory, call the function recursively
                    processSourceCode(`${dirName}/${file}`);
                } else {
                    // if file, process the file
                    processFile(`${dirName}/${file}`);
                }
            });
        });
    });

}
