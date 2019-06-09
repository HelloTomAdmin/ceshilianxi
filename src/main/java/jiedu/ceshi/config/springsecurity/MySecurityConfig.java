package jiedu.ceshi.config.springsecurity;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
@EnableWebSecurity
public class MySecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        http.authorizeRequests().antMatchers("/").permitAll()
        .antMatchers("/admin-404.html").permitAll()
        .antMatchers("/fail.html").permitAll()
        .antMatchers("/success.html").hasRole("Level1")
        .antMatchers("admin-index.html").permitAll()
        .antMatchers("/admin-index.html").hasRole("Level1");



        http.formLogin().loginPage("/login");   //登陆

        http.logout();   //注销

//        http.rememberMe();   //记住我
          http.rememberMe().rememberMeParameter("remberMe");    //设置rememberMe的名称


    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        super.configure(auth);
        auth.inMemoryAuthentication().withUser("zhangsan").password("123").roles("Level1");
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
//        super.configure(web);
        web.ignoring().antMatchers("/**");
    }
}
