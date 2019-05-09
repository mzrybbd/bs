module.exports = function (date) {
    let year = date.getFullYear(),
        mon = date.getMonth()+1,
        day = date.getDate()
    if(mon<10) {
        mon = '0' + mon
    }
    if(day<10) {
        day = '0' + day
    }
    return year + '-' + mon + '-' + day
}
