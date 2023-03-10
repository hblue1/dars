package kr.ac.dars.controller.function;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.dars.service.security.UserService;

@Controller
public class Function3DController {
    @Autowired
    private UserService uservice;
    
    @RequestMapping(value = "/function/Function3D")
    public String home(Authentication authentication, Model model)
    {
        List<String> memberInfo = new ArrayList<String>();
        memberInfo.add(uservice.getMemberInfo(authentication.getName()).getName());
        memberInfo.add(uservice.getMemberInfo(authentication.getName()).getCellphone());
        model.addAttribute("member", memberInfo);
        
        return "function/Function3D.html";
    }
}
