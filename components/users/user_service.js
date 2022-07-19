exports.login = async (email, password) => {
    let user = users.filter(item => item.email == email);
    if(user.length > 0){
        if(user[0].password == password){
            return user[0];
        }
    }
    return null;
};

var users = [
    {_id: 1, email: 'admin@gmail.com', password: 'admin'},
    {_id: 2, email: 'user@gmail.com', password: 'user'}
];
