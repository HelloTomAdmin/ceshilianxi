package jiedu.ceshi.service.impl;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class Task {

    @Scheduled(cron = "0/2 * * * * ? ")
    public void hello(){
        System.out.println("hello .定时器");
    }

}
