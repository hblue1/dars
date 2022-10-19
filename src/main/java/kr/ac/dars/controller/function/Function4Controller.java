package kr.ac.dars.controller.function;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.component.UserLogComponet;
import kr.ac.dars.dto.function.Function4Dto;
import kr.ac.dars.dto.system.UserLogDto;
import kr.ac.dars.service.function.Function4Service;
import kr.ac.dars.service.system.UserLogService;

@Controller
public class Function4Controller {
    @Autowired
    private UserLogComponet userLogComponent;

    @Autowired
    private UserLogService userLogService;
    
    @Autowired
    private Function4Service service;

    @RequestMapping(value = "/function/Function4")
    public String home(Model model)
    {
        UserLogDto dto = new UserLogDto(
                                    userLogComponent.getAccess_Id(),
                                    userLogComponent.getAccess_ip(),
                                    userLogComponent.getAccess_Time(),
                                    userLogComponent.getAccess_role(),
                                    userLogComponent.getAccess_URI());
        userLogService.insertUserLog(dto);
        return "function/Function4.html";
    }

    @PostMapping(value = "/function/Function4/getAudioInfo")
    @ResponseBody
    public List<Function4Dto> getAudioInfo(Function4Dto dto)
    {
        System.out.println(service.connect());
        return service.getAudioInfo(dto);
    }

    @PostMapping(value = "/function/Function4/getAudioFile")
    @ResponseBody
    public String getAudioFile(Function4Dto dto)
    {   
        return service.getAudioFile(dto);
    }
}
