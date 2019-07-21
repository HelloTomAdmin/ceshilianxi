package jiedu.ceshi;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
@Configuration
public class Config extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/success").setViewName("success");
        registry.addViewController("/fail").setViewName("fail");
        registry.addViewController("/RetrievePwd").setViewName("recover_password");
        registry.addViewController("/admin-404").setViewName("admin-404");
        registry.addViewController("/admin-index").setViewName("zhanan/admin-index");
        registry.addViewController("/login").setViewName("login");

    }

}
