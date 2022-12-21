package kr.ac.dars.dao.function;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.function.Function2Dto;

@Repository
@Mapper
public interface Function2Dao {
    public List<Function2Dto> getAudioInfo1();
    public List<Function2Dto> getAudioInfo2();
}
