package kr.ac.dars.controller.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SystemController {
    @GetMapping("/system")
    public String system(HttpServletRequest request) {
        return "system/system.html";
    }

    @GetMapping("/accessDenied")
	public String accessDenied() {
		return "system/accessDenied.html";
	}
}
