package kr.ac.dars.controller.function;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.component.UserLogComponet;
import kr.ac.dars.dto.function.Function3Dto;
import kr.ac.dars.dto.system.UserLogDto;
import kr.ac.dars.service.function.Function3Service;
import kr.ac.dars.service.system.UserLogService;

@Controller
public class Function3Controller {
    @Autowired
    private UserLogComponet userLogComponent;

    @Autowired
    private UserLogService userLogService;
    
    @Autowired
    private Function3Service service;

    @RequestMapping(value = "/function/Function3")
    public String home(Model model)
    {
        UserLogDto dto = new UserLogDto(
                                    userLogComponent.getAccess_Id(),
                                    userLogComponent.getAccess_ip(),
                                    userLogComponent.getAccess_Time(),
                                    userLogComponent.getAccess_role(),
                                    userLogComponent.getAccess_URI());
        userLogService.insertUserLog(dto);
        
        return "function/Function3.html";
    }

    @PostMapping(value = "/function/Function3/getAudioInfo")
    @ResponseBody
    public List<Function3Dto> getAudioInfo(char category)
    {
        System.out.println(service.connect());
        return service.getAudioInfo(category);
    }
}
