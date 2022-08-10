package kr.ac.dars.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.Function2Dto;
import kr.ac.dars.service.Function2Service;

@Controller
public class Function2Controller {
    @Autowired
    private Function2Service service;
    
    @RequestMapping(value = "/Function2")
    public String home(Model model)
    {
        return "Function2.html";
    }

    @PostMapping(value = "/Function2/getAudioInfo")
    @ResponseBody
    public Function2Dto getAudioInfo(Function2Dto dto)
    {
        System.out.println(service.connect());
        return service.getAudioInfo(dto);
    }

    @PostMapping(value = "/Function2/disconnectSFTP")
    @ResponseBody
    public void disconnect(){
        service.disconnection();
    }

    @PostMapping(value = "/Function2/getAudioFile")
    @ResponseBody
    public String getAudioFile(Function2Dto dto)
    {
        System.out.println(dto);
        return service.getAudioFile(dto);
    }
}
