const mandelTools = require('./mandelTools');
const {createCanvas} = require('canvas-prebuilt');
const fs = require('fs');
module.exports = {
    createCanvas: function (x, y, iter) {
                const myCanvas = createCanvas(x,y);
                var ctx = myCanvas.getContext("2d");
                // Start drawing
                var magnificationFactor = iter;
                var panX = 0;
                var panY = 0;
                for(var x=0; x < myCanvas.width; x++) {
                    for(var y=0; y < myCanvas.height; y++) {
                        var belongsToSet = mandelTools.checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX, y/magnificationFactor - panY);
                        if(belongsToSet == 0) {
                            ctx.fillStyle = '#000';
                            ctx.fillRect(x,y, 1,1); // Draw a black pixel
                        } else {
                            ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
                            ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
                        }              
                    } 
                }
        return myCanvas;
    },
    saveCanvasToPNG: function (dir, newMandel) {
        let files = fs.readdirSync(dir);
        const id_num = files.length; 
        const tempName = 'mandel' + id_num + '.png';

        const dataURL = newMandel.toDataURL();
        const data = dataURL.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(data, 'base64');
        fs.appendFileSync(dir+tempName, buf, function(err) {
            if(err) throw err;
        });
        return tempName;
    }
}