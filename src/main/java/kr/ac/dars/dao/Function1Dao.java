package kr.ac.dars.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.Function1Dto;

@Repository
@Mapper
public interface Function1Dao {
    public List<Function1Dto> getAudioInfo();
}
