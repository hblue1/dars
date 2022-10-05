package kr.ac.dars.controller.home;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.dars.config.UserLogComponet;
import kr.ac.dars.dto.security.UserLogDto;
import kr.ac.dars.service.security.UserLogService;

@Controller
public class FunctionSelectController {
    @Autowired
    private UserLogComponet userLogComponent;

    @Autowired
    private UserLogService userLogService;

    @RequestMapping(value = "/home/FunctionSelect")
    public String home(Model model)
    {
        UserLogDto dto = new UserLogDto(userLogComponent.getAccess_Id(),userLogComponent.getAccess_ip(),userLogComponent.getAccess_Time(),userLogComponent.getAccess_role());
        userLogService.insertUserLog(dto);
        return "home/FunctionSelect.html";
    }
}
