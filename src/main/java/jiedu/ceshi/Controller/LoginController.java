package jiedu.ceshi.Controller;

import jiedu.ceshi.model.User;
import jiedu.ceshi.service.LoginService;
import jiedu.ceshi.util.CryptUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/homeLogin")
public class LoginController {

    @Autowired
    private LoginService loginService;


    @RequestMapping(path = "/checkUserName",produces = "application/json;charset=UTF-8")
    public String homeLogin (User user){
        String userName = user.getUserName();
        String passWord = user.getPassWord();
        String s = CryptUtil.MD5(passWord);
        User userByName = loginService.findUserByName(userName);

        if(s.equals(userByName.getPassWord())){
            return "success";
        }
        return "fail";
    }



}
