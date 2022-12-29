package kr.ac.dars.controller.system;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.system.FileManagementDto;
import kr.ac.dars.service.security.UserService;
import kr.ac.dars.service.system.FileManagementService;

@Controller
public class FileManagementController {
    @Autowired
    private FileManagementService service;

    @Autowired
    private UserService uservice;

    @GetMapping(value = "/system/FileManagement")
    public String home(Authentication authentication, Model model) {
        List<String> memberInfo = new ArrayList<String>();
        memberInfo.add(uservice.getMemberInfo(authentication.getName()).getName());
        memberInfo.add(uservice.getMemberInfo(authentication.getName()).getCellphone());
        model.addAttribute("member", memberInfo);
        return "/system/FileManagement.html";
    }

    @PostMapping(value = "/system/getFileInfo")
    @ResponseBody
    public List<FileManagementDto> getFileInfo() {
        return service.getFileInfo();
    }
}

