package com.zivio.Service;

import com.zivio.model.User;

public interface UserService {
     User findUserByJwtToken(String jwt) throws Exception;
     User findUserByEmail(String email) throws Exception;
}
