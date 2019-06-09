package jiedu.ceshi.service.impl;

import jiedu.ceshi.mapper.RetrievePwdMapper;
import jiedu.ceshi.model.User;
import jiedu.ceshi.service.RetrievePwdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RetrievePwdServiceImpl implements RetrievePwdService {

    @Autowired
    public RetrievePwdMapper retrievePwdMapper;

    @Override
    public void updatePwd(User data) {
        retrievePwdMapper.updatePwd(data.getUserId().toString(),data.getPassWord());
    }
}
