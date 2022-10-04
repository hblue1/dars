package kr.ac.dars.dao.function;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.function.Function5Dto;

@Repository
@Mapper
public interface Function5Dao {
    public Function5Dto loadFile(Function5Dto dto);
    public List<String> getAudioList(Function5Dto dto);
}
