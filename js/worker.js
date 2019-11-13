onmessage = function (e) {
    console.log('Worker: Message received from main script');
    const data = e.data.data;
    const width = e.data.width;
    const height = e.data.height;

    var start = new Date().getTime();
    var d = data;

    //已有点初始二维数组
    var dlen = d.length;
    var matrixData = new Array(width * height);
    var idwcount = 0
    for (var i = 0, k1 = 0; i < height; i++) {
        for (var j = 0; j < width; j++ , k1++) {
            if (!matrixData[k1]) {
                var sum0 = 0, sum1 = 0;
                for (var k = dlen - 1; k >= 0; k--) {
                    var dk = d[k];
                    var dis = Math.pow((i - dk.y), 2) + Math.pow((j - dk.x), 2);
                    sum0 += dk.value * 1 / dis;
                    sum1 += + 1 / dis;
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
}
