const db = require('./connection_db');

module.exports = function register(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO member_info SET ?', memberData, function (err, rows) {
            if (err) {
                console.log(err);
                result.status = "Register Fail"
                result.err = "Register Fail"
                reject(result);
                return;
            }
            result.registerMember = memberData;
            resolve(result);
        })
    })
}