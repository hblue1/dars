package kr.ac.dars.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.Function2Dto;

@Repository
@Mapper
public interface Function2Dao {
    public Function2Dto getAudioInfo(Function2Dto dto);
}
