package jiedu.ceshi.mapper;

import jiedu.ceshi.model.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    public User findUserById(String id);
    public User findUserByName(String username);
}
