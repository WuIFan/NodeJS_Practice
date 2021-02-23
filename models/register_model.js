const db = require('./connection_db');

module.exports = function register(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT email FROM member_info WHERE email = ?', memberData.email, function (err, rows) {
            if (err) {
                console.log(err);
                result.status = "Fail"
                result.err = "Fail"
                reject(result);
                return;
            }
            if (rows.length >= 1) {
                result.status = "Fail";
                result.err = "Email has already been used";
                reject(result);
            } else {
                db.query('INSERT INTO member_info SET ?', memberData, function (err, rows) {
                    if (err) {
                        console.log(err);
                        result.status = "Fail";
                        result.err = "Fail"
                        reject(result);
                        return;
                    }
                    result.status = "Success"
                    result.registerMember = memberData;
                    resolve(result);
                })
            }
        })
    })
}