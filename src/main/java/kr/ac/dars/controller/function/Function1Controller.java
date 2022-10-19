package kr.ac.dars.controller.function;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.component.UserLogComponet;
import kr.ac.dars.dto.function.Function1Dto;
import kr.ac.dars.dto.system.UserLogDto;
import kr.ac.dars.service.function.Function1Service;
import kr.ac.dars.service.system.UserLogService;

@Controller
public class Function1Controller {
    @Autowired
    private UserLogComponet userLogComponent;

    @Autowired
    private UserLogService userLogService;
    
    @Autowired
    private Function1Service service;

    @RequestMapping(value = "/function/Function1")
    public String home(Model model)
    {
        UserLogDto dto = new UserLogDto(
            userLogComponent.getAccess_Id(),
            userLogComponent.getAccess_ip(),
            userLogComponent.getAccess_Time(),
            userLogComponent.getAccess_role(),
            userLogComponent.getAccess_URI());
        userLogService.insertUserLog(dto);
        return "function/Function1.html";
    }

    @PostMapping(value = "/function/Function1/getAudioInfo")
    @ResponseBody
    public List<Function1Dto> getAudioInfo()
    {
        System.out.println(service.connect());
        return service.getAudioInfo();
    }   
}
