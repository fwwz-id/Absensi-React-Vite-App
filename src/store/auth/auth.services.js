import http from '../../http-common';

class AuthService{
    getJWTToken(){
        return http.get('/login')
    }

    login(credentials){
        return http.post('/login', credentials)
    }

    register(data){
        return http.post('/register', data)
    }
}

export default new AuthService();