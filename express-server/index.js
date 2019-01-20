const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const tools = require('./tools');
const matrixFunction = require('./matrixFunction');
const myMandelbrot = require('./myMandelbrot');


var corsOptions = {
    origin: 'http://localhost:4200',
    optionSuccessStatus: 200
}

app.use(express.json(), cors(corsOptions), bodyParser.json());



app.post('/api/files', (req, res) => {
    console.log(req.body);
    let start = process.hrtime();
    let listMatrix = new Array();
    const files = Object.values(req.body);
    files.forEach((file, index) => {
        const matrixFile = tools.createMatrixFromFile(file, index+1);
        listMatrix.push(matrixFile);
    });
    temp = matrixFunction.multipleMatrix(listMatrix[0].matrix, listMatrix[1].matrix);
    let end = process.hrtime(start);

    const response = {time:end, matrix: temp}
    res.send(response);
});

app.get('/api/matricesID', (req, res) => {
    const dir = './matrix/';
    let files = fs.readdirSync(dir);
    res.send({matriciesID: files});
});


app.post('/api/fileMatrix', (req, res) => {
    const decodedValue = req.body.value;
    const encodedValue = Buffer.from(decodedValue, 'base64').toString('ascii');
    const dir = './matrix/';
    const idFile = tools.saveMatrixToFile(dir, encodedValue);
    res.send({fileId: idFile});
});

app.post('/api/multiply', (req, res) => {
    const dir = './matrix/';
    const Ids = [req.body.firstID, req.body.secondID];
    let listMatrix = new Array();
    Ids.forEach( nameFile => {
        const matrixVal = fs.readFileSync(dir+nameFile, 'utf8');
        const matrix = matrixFunction.createMatrix(matrixVal);
        listMatrix.push(matrix);
    });

    const multiplyMatrix = matrixFunction.multipleMatrix(listMatrix[0], listMatrix[1]);
    const valueFile = tools.createFileFromMatrix(multiplyMatrix);
    const idFile = tools.saveMatrixToFile(dir, valueFile);
    res.send({matrixID: idFile});
});


app.post('/api/mandel', (req, res) => {
    const mandelParams = {
        xDim: req.body.xDim,
        yDim: req.body.yDim,
        countIter: req.body.countIter
    }
    const newMandel = myMandelbrot.createCanvas(mandelParams.xDim, mandelParams.yDim, mandelParams.countIter);
    const dir = './mandel/';
    const idMandel = myMandelbrot.saveCanvasToPNG(dir, newMandel);

    res.send({idMandel: idMandel});
});

app.get('/api/mandelsID', (req, res) => {
    const dir = './mandel/';
    let files = fs.readdirSync(dir);

    res.send({mandelsID: files});
});


app.post('/api/mandelID', (req, res) => {
    console.log(req.body);
    tempName = req.body.mandelID;
    const dir = './mandel/'
    const mandelBitmap = fs.readFileSync(dir+tempName);
    const mandelValue = Buffer.from(mandelBitmap).toString('base64');

    res.send({data: mandelValue});
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
