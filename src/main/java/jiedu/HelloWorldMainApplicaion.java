package jiedu;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ServletComponentScan   //服务自动注册
//@EnableScheduling   //定时器功能
//@MapperScan({"jiedu.ceshi.mapper"})
public class HelloWorldMainApplicaion {
    public static void main(String[] args) {
        SpringApplication.run(HelloWorldMainApplicaion.class,args);
    }

}
