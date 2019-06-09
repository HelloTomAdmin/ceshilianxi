package jiedu.ceshi.service.impl;

import jiedu.ceshi.mapper.LoginMapper;
import jiedu.ceshi.model.User;
import jiedu.ceshi.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginMapper loginMapper;

    @Override
    public User findUserById(String id) {
        return loginMapper.findUserById(id);
    }

    @Override
    public User findUserByName(String username) {
        return loginMapper.findUserByName(username);
    }
}
