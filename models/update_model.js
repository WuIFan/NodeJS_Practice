const db = require('./connection_db');

module.exports = function customerEdit(id, memberUpdateData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('UPDATE member_info SET ? WHERE id = ?', [memberUpdateData, id], function (err, rows) {
            if (err) {
                console.log(err);
                result.status = "Update fail"
                result.err = "fail"
                reject(result);
                return;
            }
            result.status = "Update successfully"
            result.memberUpdateData = memberUpdateData
            resolve(result)
        })
    })
}