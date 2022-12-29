package kr.ac.dars.controller.home;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.dars.component.UserLogComponet;
import kr.ac.dars.dto.system.UserLogDto;
import kr.ac.dars.service.security.UserService;
import kr.ac.dars.service.system.UserLogService;

@Controller
public class FunctionSelectController {
    @Autowired
    private UserLogComponet userLogComponent;

    @Autowired
    private UserLogService userLogService;

    @Autowired
    private UserService uservice;

    @RequestMapping(value = "/home/FunctionSelect")
    public String home(Authentication authentication, Model model)
    {
        UserLogDto dto = new UserLogDto(
                                    userLogComponent.getAccess_Id(),
                                    userLogComponent.getAccess_ip(),
                                    userLogComponent.getAccess_Time(),
                                    userLogComponent.getAccess_role(),
                                    userLogComponent.getAccess_URI());
        userLogService.insertUserLog(dto);
        List<String> memberInfo = new ArrayList<String>();
        memberInfo.add(uservice.getMemberInfo(authentication.getName()).getName());
        memberInfo.add(uservice.getMemberInfo(authentication.getName()).getCellphone());
        model.addAttribute("member", memberInfo);

        return "home/FunctionSelect.html";
    }
}
