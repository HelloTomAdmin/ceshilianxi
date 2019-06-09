package jiedu.ceshi.service;

import jiedu.ceshi.model.User;
import org.springframework.stereotype.Service;


public interface LoginService {
    public User findUserById(String id);

    public User findUserByName(String username);
}
