package kr.ac.dars.dao.function;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.function.Function1Dto;

@Repository
@Mapper
public interface Function1Dao {
    public List<Function1Dto> getAudioInfo();
}
