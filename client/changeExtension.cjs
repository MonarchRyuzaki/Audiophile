const fs = require('fs');
const path = require('path');

// Recursively rename .js and .jsx files
function renameFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // If it's a directory, recurse
            renameFiles(filePath);
        } else {
            // Check for .js or .jsx files
            if (file.endsWith('.js')) {
                const newFilePath = filePath.replace(/\.js$/, '.ts');
                fs.renameSync(filePath, newFilePath);
                console.log(`Renamed: ${filePath} -> ${newFilePath}`);
            } else if (file.endsWith('.jsx')) {
                const newFilePath = filePath.replace(/\.jsx$/, '.tsx');
                fs.renameSync(filePath, newFilePath);
                console.log(`Renamed: ${filePath} -> ${newFilePath}`);
            }
        }
    });
}

// Start renaming from the current directory
renameFiles(__dirname);
