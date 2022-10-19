package kr.ac.dars.controller.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.system.UserLogDto;
import kr.ac.dars.service.system.UserLogService;

@Controller
public class UserLogController {
    @Autowired
    private UserLogService service;
    
    @GetMapping(value = "/system/UserLog")
    public String home(Model model) {
        return "system/UserLog.html";
    }

    @PostMapping(value = "/system/getUserLog")
    @ResponseBody
    public List<UserLogDto> getUserLog() {
        return service.getUserLog();
    }
}
