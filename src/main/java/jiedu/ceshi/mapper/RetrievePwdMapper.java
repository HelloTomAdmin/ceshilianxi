package jiedu.ceshi.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RetrievePwdMapper{
    public void updatePwd(String userId, String passWord);
}
