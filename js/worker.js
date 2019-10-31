onmessage = function (e) {
    console.log('Worker: Message received from main script');
    // let result = e.data[0] * e.data[1];
    // const [data,width,height] = e.data;
    const data = e.data.data;
    const width = e.data.width;
    const height = e.data.height;

    var start = new Date().getTime();
    var d = data;

    //已有点初始二维数组
    var dlen = d.length;
    var matrixData = new Array(width * height);

    /**
     * 插值矩阵数据,时间复杂度O(height*width*len)
     */
    var idwcount = 0
    for (var i = 0, k1 = 0; i < height; i++) {
        for (var j = 0; j < width; j++ , k1++) {
            if (!matrixData[k1]) {
                var sum0 = 0, sum1 = 0;
                for (var k = 0; k < dlen; k++) {
                    var dk = d[k];
                    var dis = ((i - dk.y) * (i - dk.y) + (j - dk.x) * (j - dk.x));
                    sum0 = sum0 + dk.value * 1 / dis;
                    sum1 = sum1 + 1 / dis;
                    idwcount++
                }
                if (sum1 != 0)
                    //matrixData[k1] = sum0 / sum1 - referenceValue;
                    matrixData[k1] = sum0 / sum1;
                else
                    matrixData[k1] = 1;
            }
        }
    }
    console.log(idwcount)
    var end = new Date().getTime();
    console.log('插值：' + (end - start) / 1000 + '秒');
    postMessage(matrixData);
    // if (isNaN(result)) {
    //     postMessage('Please write two numbers');
    // } else {
    //     let workerResult = 'Result: ' + result;
    //     console.log('Worker: Posting message back to main script');
    //     postMessage(workerResult);
    // }
}
