package kr.ac.dars.controller.home;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.dars.service.security.UserService;

@Controller
public class MyPageController {
    @Autowired
    private UserService service;
    
    @RequestMapping(value = "/home/MyPage")
    public String home(Authentication authentication, Model model)
    {
        List<String> memberInfo = new ArrayList<String>();
        memberInfo.add(authentication.getName());
        memberInfo.add(service.getMemberInfo(authentication.getName()).getName());
        memberInfo.add(service.getMemberInfo(authentication.getName()).getCellphone());
        // memberInfo.add(service.getMemberInfo(authentication.getName()).getEmail());
        model.addAttribute("member", memberInfo);

        return "home/MyPage.html";
    }
}
