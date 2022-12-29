package kr.ac.dars.dto.system;

import lombok.Data;

@Data
public class UserActivityDto {
    private String user_id;
    private String activity;
    private double activity_time;
}
