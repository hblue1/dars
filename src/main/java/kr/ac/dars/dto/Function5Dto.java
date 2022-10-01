package kr.ac.dars.dto;

import java.util.Map;

import lombok.Data;

@Data
public class Function5Dto {
    private int index;
    private int col;
    private int row;
    private int cnt;
    private String nullpoint;
    private String horizontal;
    private String vertical;
    private Map<String,String> audio;
}
