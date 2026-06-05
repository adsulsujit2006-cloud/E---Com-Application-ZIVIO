package com.zivio.Service;

import com.zivio.request.LoginRequest;
import com.zivio.responce.AuthResponce;
import com.zivio.responce.SignupRequest;

public interface AuthService {
    void sentLoginOtp(String email) throws Exception;
String createUser(SignupRequest req) throws Exception;
AuthResponce siging(LoginRequest req);


}
