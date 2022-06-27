package kr.ac.dars.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.Function4Dto;

@Repository
@Mapper
public interface Function4Dao {
    public List<Function4Dto> getAudioInfo(Function4Dto dto);
}
