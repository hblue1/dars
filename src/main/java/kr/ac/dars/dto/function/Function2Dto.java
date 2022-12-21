package kr.ac.dars.dto.function;

import lombok.Data;

@Data
public class Function2Dto {
    private String speechcode;
    private String speechcontext;
    private String questioncode;
    private String questioncontext;
    private String answer;
    private String audio;
}
