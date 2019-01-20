const matrixFunction = require('./matrixFunction');
const fs = require('fs');


module.exports = {
    createMatrixFromFile: function(file, numId) {
        const decodedValue = file.value;
        const encodedValue = Buffer.from(decodedValue, 'base64').toString('ascii');
        const fileUpload = {
            id: numId,
            name: file.filename,
            matrix: matrixFunction.createMatrix(encodedValue)
        }
        return fileUpload;
    },
    createFileFromMatrix: function(matrix) {
        let myJSON = JSON.parse(matrix);
        let matrixSchema = '';
        for (let i = 0; i < myJSON.length ; i++) {
            const temp = myJSON[i];
            for (let j = 0; j < temp.length; j++) {
                matrixSchema += myJSON[i][j];
                if(temp.length - j != 1) {
                    matrixSchema += ' '; 
                }
            }
           if(temp.length - i != 1) {
            matrixSchema += '\n'; 
           }
        }
        return matrixSchema;
    },
    saveMatrixToFile: function(dir, value) {
        let files = fs.readdirSync(dir);
        const id_num = files.length; 
        const tempName = 'matrix' + id_num + '.txt';

        fs.appendFileSync(dir + tempName, value, function(err) {
            if (err) throw err;
            console.log('saved');
        });
      return tempName;
    }
};


