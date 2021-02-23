const db = require('./connection_db');

module.exports = function memberLogin(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM member_info WHERE email = ? AND password = ?', [memberData.email, memberData.password], function (err, rows) {
            if (err) {
                result.status = "Fail"
                result.err = "Fail"
                reject(result);
                return;
            }
            resolve(rows);
        });
    });
}