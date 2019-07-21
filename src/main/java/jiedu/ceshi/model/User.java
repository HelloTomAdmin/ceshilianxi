package jiedu.ceshi.model;


//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class User{
    private Long userId;
    private String userName;
    private String passWord;
    private String tel;
    private Integer isValid;

    public User(Long userId, String userName, String passWord, String tel, Integer isValid) {
        this.userId = userId;
        this.userName = userName;
        this.passWord = passWord;
        this.tel = tel;
        this.isValid = isValid;
    }

    public Long getUserId() {

        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Integer getIsValid() {
        return isValid;
    }

    public void setIsValid(Integer isValid) {
        this.isValid = isValid;
    }

    public User() {

    }

}
