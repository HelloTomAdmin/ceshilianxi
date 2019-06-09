package jiedu.ceshi.Controller;

import jiedu.ceshi.model.User;
import jiedu.ceshi.service.LoginService;
import jiedu.ceshi.service.RetrievePwdService;
import jiedu.ceshi.util.CryptUtil;
import jiedu.ceshi.util.ImgCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/retrievePwd")
public class RetrievePwd {

    @Autowired
    private LoginService loginService;

    @Autowired
    private RetrievePwdService retrievePwdService;




    @RequestMapping("/toRetrievePwd")
    public String  toRetrievePwd(){
        return "recover_password";
    }


    @RequestMapping(value = "/verifyUser")
    @ResponseBody
    public Map verifyUser(@RequestParam("user_name") String username, HttpSession session) {
        Map <String,Object>dataMap=new HashMap<String, Object>();
        try {
            User byUser = loginService.findUserByName(username);
            if (byUser != null) {
                dataMap.put("ok", true);
                dataMap.put("msg", "输入正确");
                session.setAttribute("verifyUser", byUser);//账号信息

                session.setAttribute("IsValidation", "false");//是否被验证
            } else {
                dataMap.put("ok", false);
                dataMap.put("msg", "用户名输入错误");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            dataMap.put("ok", false);
            dataMap.put("msg", "用户名输入错误");
        }
        return dataMap;
    }

    /**
     * 生成二维码传给前端
     *
     * @param session
     * @return
     */
    @PostMapping(path = "/getCoderNum", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getCoderNum(HttpSession session) {
        Map<String, Object> result = new HashMap<String, Object>();

        try {
            String verifyCode = ImgCodeUtil.generateVerifyCode(4);
            session.setAttribute("randStr", verifyCode);//输出所求的验证码的值
            int w = 120, h = 40;
            //根据4位验证码生成base64位图片数据并传到前台
            String imageString = ImgCodeUtil.MyoutputImage(w, h, verifyCode);
            result.put("image", imageString);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }


    /**
     * 验证二维码
     */
    @RequestMapping(value = "/verifyCode")
    @ResponseBody
    public Map verifyCode(@RequestParam("user_verify") String code, HttpSession session) {
        Map map = new HashMap();
        if (!"".equals(code) && code.length() > 0) {

            if (session.getAttribute("randStr") != null && code != null) {
                if (!session.getAttribute("randStr").equals(code.toUpperCase())) {
                    map.put("ok", false);
                    map.put("msg","图片验证码错误");
                    return map;
                }
            }
        }
        return null;
    }


    @RequestMapping("/getTel")
    @ResponseBody
    public Map getTel(HttpSession session){
        Map map = new HashMap();
        try {
            User verifyUser = (User)session.getAttribute("verifyUser");
            String tel = verifyUser.getTel();
            map.put("ok",true );
            map.put("tel",tel );

        } catch (Exception e) {
            map.put("ok",false );

        }
        return map;
    }



    @RequestMapping(value = "/verifyNode")
    @ResponseBody
    public Map verifyNode(@RequestParam("Verification") String node, HttpSession session) {
        Map map = new HashMap();
        String phoneNode = "123";
        if ("123".equals(node.trim())) {
            session.setAttribute("IsValidation", "true");
            map.put("ok",true );
            map.put("msg","");
        } else {
            map.put("ok", false);
            map.put("msg", "短信验证码错误");

        }
        return map;
    }


    /**
     * 修改密码
     */
    @RequestMapping("/updatePwd")
    @ResponseBody
    public Map updatePwd(String password, HttpSession session) {
        Map map = new HashMap();
        try {
            //判断是否验证
            String isValidation = (String) session.getAttribute("IsValidation");
            if (!"true".equalsIgnoreCase(isValidation)) {
                map.put("ok", false);
                map.put("msg", "账号未被验证或已超时");
            }

            User data=new User();
            //修改密码
            User verifyUser = (User) session.getAttribute("verifyUser");
            data.setUserId(verifyUser.getUserId());
            data.setPassWord(CryptUtil.MD5(password));
            retrievePwdService.updatePwd(data);
            session.removeAttribute("verifyUser");
            map.put("ok",true );
            map.put("msg","");
        } catch (Exception e) {
            e.printStackTrace();
            map.put("ok", false);
            map.put("msg", "密码修改失败");
        }
        return map;
    }






}
