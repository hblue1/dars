package kr.ac.dars.dto.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLogDto {
    private String access_id;
    private String access_ip;
    private String access_time;
    private String access_role;
}
