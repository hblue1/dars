package kr.ac.dars.controller.system;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SystemController {
    @GetMapping("/system")
    public String system(HttpServletRequest request) {
        return "system/System.html";
    }

    @GetMapping("/AccessDenied")
	public String accessDenied() {
		return "system/AccessDenied.html";
	}
}
