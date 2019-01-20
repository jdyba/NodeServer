module.exports = {
    checkIfBelongsToMandelbrotSet: function(x, y) {
        var realComponentOfResult = x;
        var imaginaryComponentOfResult = y;
        var maxIterations = 100;
        for(var i = 0; i < maxIterations; i++) {
             var tempRealComponent = realComponentOfResult * realComponentOfResult
                                     - imaginaryComponentOfResult * imaginaryComponentOfResult
                                     + x;
             var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                                     + y;
             realComponentOfResult = tempRealComponent;
             imaginaryComponentOfResult = tempImaginaryComponent;
    
             // Return a number as a percentage
             if(realComponentOfResult * imaginaryComponentOfResult > 5) 
                return (i/maxIterations * 100);
        }
        return 0;   // Return zero if in set        
    }
}