package kr.ac.dars.dao.function;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.function.Function4Dto;

@Repository
@Mapper
public interface Function4Dao {
    public List<Function4Dto> getAudioInfo(Function4Dto dto);
}
