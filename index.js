
var Drawer = (function() {
    
    function draw() {
        let a = buildArray(9);
        drawMap(diamondSquare(a));
    }
    
    function drawMap(a) {
        let arrayLength = a.length;

        let canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        const canvasSize = canvas.height;
        const squareSize = Math.ceil(canvasSize / arrayLength); 
    
        for(let i = 0; i < arrayLength; i ++) {
            for(let j = 0; j < arrayLength; j++) {
                let alpha = 30 + a[i][j] * 10;
                ctx.fillStyle = `hsl(200,50%,${alpha}%)`;//water
                
                //BW
                //let alpha = Math.round(a[i][j]*100);
                //ctx.fillStyle = `rgb(${alpha},${alpha},${alpha})`;
                ctx.fillRect (i * squareSize, j * squareSize, squareSize, squareSize);
            }
        }
    }

    function diamondSquare(a) {
        let size = a.length - 1;
        
        do{
            doDiamond(a, size);
            doSquare(a, size);
            size = size / 2;
        } while(size !=1);
        
        return a;
    }

    function doDiamond(a, size) {
        let step = size;
        for(let i = 0; i <a.length-1; i+=step) {
            for(let j = 0; j < a.length-1; j+=step) {
                a[i+step/2][j+step/2] = ((a[i][j]+a[i+step][j]+a[i][j+step]+a[i+step][j+step]) /4) + getRandomArbitrary(-0.5, 0.5);
            }
        }
    }

    function doSquare(a, size) {
        let step = size /2;
        for(let i = 0; i <= a.length -1; i+=step) {
            for(let j = 0; j<=a.length -1; j+=step) {
                if(a[i][j]===null) {
                    let sum = 0;
                    let onEdges = false;

                    if(j - step >=0) {
                        
                        sum+=a[i][j-step];
                    } else {
                        onEdges = true;
                    }
                    if(i - step >=0) {
                        sum+=a[i-step][j];
                    } else {
                        onEdges = true;
                    }
                    if(j+step<a.length) {
                        sum+=a[i][j+step];
                    } else {
                        onEdges = true;
                    }
                    if(i+step<a.length) {
                        sum+=a[i+step][j];
                    } else {
                        onEdges = true;
                    }

                    a[i][j] = (onEdges ? sum / 3 : sum / 4) + getRandomArbitrary(-0.5, 0.5);
                }
            }
        }
    }

    function getRandomArbitrary(min=0, max=1) {
      return Math.random() * (max - min) + min;
    }

    function buildArray(n) {
        let arraySize = Math.pow(2, n) + 1;
        let a = new Array(arraySize).fill(null);
        a = a.map(item=>{return new Array(arraySize).fill(null)});
        
        a[0][0] = getRandomArbitrary();
        a[0][arraySize - 1] =  getRandomArbitrary();
        a[arraySize - 1][0] =  getRandomArbitrary();
        a[arraySize - 1][arraySize - 1] =  getRandomArbitrary();

        return a;
    }

    return {
        draw: draw
    };
})();
