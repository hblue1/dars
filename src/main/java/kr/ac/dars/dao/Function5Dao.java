package kr.ac.dars.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.Function5Dto;

@Repository
@Mapper
public interface Function5Dao {
    public Function5Dto loadFile(Function5Dto dto);
}
