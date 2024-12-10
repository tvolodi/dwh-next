const { is, ne } = require('drizzle-orm');
const fs = require('fs');
const { text } = require('stream/consumers');

const filePath = './lib/test_processing_file.js';

const fileExtArr = ["js", "ts", "jsx", "tsx"];

processFile(filePath);

fs.watch('./app', {recursive: true}, (eventType, filename) => {
    if(eventType === 'change') {
        console.log(`File ${filename} has been changed`);
        
    }
})


fs.watch('./lib', { recursive: true }, (eventType, filename) => {
    if (eventType === 'change') {
        console.log(`File ${filename} has been changed`);
        processFile(filename);
    }
})

fs.watch('./components', { recursive: true }, (eventType, filename) => {
    if (eventType === 'change') {
        console.log(`File ${filename} has been changed`);
    }
})

function processFile(filePath) {
    
    const fileExtension = filePath.split('.').pop();
    if (fileExtArr.indexOf(fileExtension) === -1) {
        return;
    }
    
    console.log(`Processing file ${filePath}`);

    let data;
    try {
        data = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }

    const textLines = data.split('\n');

    // #insert-file:
    for (let i = 0; i < textLines.length; i++) {
        const line = textLines[i];
        if (line.includes('#insert-file:')) {                
            const fileName = line.split('#insert-file:')[1].trim();                
            // Get the file last modified date

            try {
                const fileStat = fs.statSync(fileName);
                const fileLastModifiedDate = fileStat.mtime.toISOString();
                
                // Compare with last inserted date registered in the next line
                const nextLineIndex = i + 1;
                let isEndOfFile = false
                let nextLine = '';
                if(nextLineIndex >= textLines.length) {
                    isEndOfFile = true;
                } else nextLine = textLines[nextLineIndex];
                    
                let fileContent = fs.readFileSync(fileName, 'utf8');
                fileContent = fileContent + '\n' + `// ## insertion-end: ${fileName}`; // mark the end of the insertion
                // Check that there is a info about last inserted date

                if (!(nextLine.includes('##last-modified:'))) {
                    // It is the first time the file is inserted                        
                    textLines.splice(i + 1, 0, `// ##last-modified: ${fileLastModifiedDate}`);

                    // Insert the file content                        
                    textLines.splice(i + 2, 0, fileContent);
                } else {
                    // Replace insertion with new file content

                    // Update last modified date
                    textLines[i + 1] = `##last-modified: ${fileLastModifiedDate}`;

                    // Search for the mark of the end of the insertion
                    let insertionEndIndex = -1;
                    for (let j = i + 2; j < textLines.length; j++) {
                        if (textLines[j].includes('## insertion-end:')) {
                            insertionEndIndex = j;
                            break;
                        }
                    }
                    textLines.splice(i + 2, insertionEndIndex - i - 2, fileContent);
                }
                // Write the changes back to the file
                fs.writeFileSync(filePath, textLines.join('\n'))
                console.log(`File ${filePath} has been updated`);
                if(isEndOfFile) i = textLines.length;

            } catch (err) {
                console.error(err);
                return;
            }
        }
    }
    console.log(data);
    
}

