const math = require('mathjs');
module.exports = {
    createMatrix: function (value) {
        const split =  value.split('\n');
        let matrix = []
        for(let row of split) {
            const parseRow = row.split(' ');
            let rowNumber = [];
            for(let num of parseRow) {
                const a = parseInt(num);
                rowNumber.push(a);
            }
            matrix.push(rowNumber);
        }
        const myMatrix = math.matrix(matrix);
        return myMatrix;
    },
    multipleMatrix: (matrix1, matrix2) => {
        return math.multiply(matrix1, matrix2);
    }
};