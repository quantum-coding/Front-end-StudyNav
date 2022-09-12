function zeroFill(i) {
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}

export function getCurrentTime() {
    var date = new Date()
    var year = date.getFullYear()
    var month = zeroFill(date.getMonth() + 1)
    var day = zeroFill(date.getDate())
    var hour = zeroFill(date.getHours())
    var minute = zeroFill(date.getMinutes())
    var second = zeroFill(date.getSeconds())

    var curTime = year + "-" + month + "-" + day
        + " " + hour + ":" + minute + ":" + second

    return curTime
}

