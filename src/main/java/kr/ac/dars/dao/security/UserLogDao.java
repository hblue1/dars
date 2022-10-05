package kr.ac.dars.dao.security;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.security.UserLogDto;

@Mapper
@Repository
public interface UserLogDao {
    public void insertUserLog(UserLogDto dto);
}
