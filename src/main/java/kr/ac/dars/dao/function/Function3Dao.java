package kr.ac.dars.dao.function;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.function.Function3Dto;

@Repository
@Mapper
public interface Function3Dao {
    public List<Function3Dto> getAudioInfo(char category);
}
