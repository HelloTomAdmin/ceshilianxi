package jiedu.ceshi.Controller;


import jiedu.ceshi.model.User;
import jiedu.ceshi.service.LoginService;
import jiedu.ceshi.util.CryptUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.RequestWrapper;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {

    @RequestMapping("/")
    public String index() {
        return "index";
    }



    @Autowired
    private LoginService loginService;


    @RequestMapping("/login")
    public String login(String username,String password,Map<String,Object>map){
        try {

            User loginUser = loginService.findUserByName(username);
            map.put("login",loginUser.getUserName());

            if(CryptUtil.MD5(loginUser.getPassWord()) .equals(password)&&password!=null) {
                return  "redirect:/success.html";
            }
            map.put("msg", "登陆成功");
            return "redirect:/success.html";
        } catch (Exception e) {
            map.put("msg", "登陆失败");
            return "redirect:/fail.html";
        }

    }
}
