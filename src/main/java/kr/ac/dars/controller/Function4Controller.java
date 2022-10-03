package kr.ac.dars.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.Function4Dto;
import kr.ac.dars.service.Function4Service;

@Controller
public class Function4Controller {
    @Autowired
    private Function4Service service;

    @RequestMapping(value = "/action/Function4")
    public String home(Model model)
    {
        return "Function4.html";
    }

    @PostMapping(value = "/action/Function4/getAudioInfo")
    @ResponseBody
    public List<Function4Dto> getAudioInfo(Function4Dto dto)
    {
        System.out.println(service.connect());
        return service.getAudioInfo(dto);
    }

    // @PostMapping(value = "/Function4/disconnectSFTP")
    // @ResponseBody
    // public void disconnect(){
    //     service.disconnection();
    // }

    @PostMapping(value = "/action/Function4/getAudioFile")
    @ResponseBody
    public String getAudioFile(Function4Dto dto)
    {   
        return service.getAudioFile(dto);
    }
}
