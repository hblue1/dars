package kr.ac.dars.dao.system;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.system.UserLogDto;

@Mapper
@Repository
public interface UserLogDao {
    public void insertUserLog(UserLogDto dto);
    public List<UserLogDto> getUserLog();
}
