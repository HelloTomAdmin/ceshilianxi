package jiedu.ceshi;


import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
@Configuration
public class Config extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/success.html").setViewName("success");
        registry.addViewController("/fail.html").setViewName("fail");
        registry.addViewController("/RetrievePwd").setViewName("recover_password");
        registry.addViewController("/admin-404.html").setViewName("admin-404");
        registry.addViewController("/admin-index.html").setViewName("admin-index");

    }

}
