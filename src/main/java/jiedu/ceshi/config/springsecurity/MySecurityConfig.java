//package jiedu.ceshi.config.springsecurity;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
//@Configuration
//@EnableWebSecurity
//public class MySecurityConfig extends WebSecurityConfigurerAdapter {
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
// ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry security = http
//                .authorizeRequests()
//                .antMatchers("/css/**", "/images/**", "/js/**", "font/**", "/static/AdminLTE/**").permitAll()
//
//                .antMatchers("/home/**").hasRole("Level1") //
//                .anyRequest().authenticated();
//        security.and()
//                .formLogin()
//                .loginPage("/login")
//                .usernameParameter("username")
//                .passwordParameter("password").defaultSuccessUrl("/success",true)
//                .permitAll();
//
//        security.and().csrf().disable();
//
//
//
//
//
//
////                security.and().formLogin().loginPage("/login");
//
//
//
//
//
//
//
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
////        super.configure(auth);
//        auth.inMemoryAuthentication().withUser("zhangsan").password("123").roles("Level1");
//    }
//
//

