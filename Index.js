const sass = require("sass");
const fs = require("fs");
const { extname } = require("path");

/**
 * Convert folders containing Sass files to CSS to another folder.
 * @param {string} fromPath The path to the folder where your Sass files are located
 * @param {string} destinationPath The path of the folder in which you want to convert your Sass
 * @param {string} outputStyle "compressed" or "expanded"
 * @param {bool} createDestinationFolder If the value is true then the destination folder will be created if it does not exist
 */
async function convert(fromPath, destinationPath, outputStyle = "compressed", createDestinationFolder = true){
    // Create destination path :
    if(createDestinationFolder) if(!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath);

    // Convert SASS to CSS :
    let convert = function(path = ""){
        if(!fs.statSync(fromPath + path).isDirectory()) return;

        let files = fs.readdirSync(fromPath + path);

        files.forEach(file => {
            if(fs.statSync(fromPath + path + file).isDirectory()){
                convert(path + file + "/");
            } else {
                if(![".scss", ".sass"].includes(extname(file))) return;

                let result = sass.renderSync({file: fromPath + path + file, outputStyle: outputStyle});

                // Create the path if does not exist :
                if(!fs.existsSync(destinationPath + path)) fs.mkdirSync(destinationPath + path);

                // Write CSS :
                fs.writeFileSync(destinationPath + path + file.substr(0, file.length - 5) + ".css", result.css);
            }
        });
    }

    convert();
}

module.exports = convert;