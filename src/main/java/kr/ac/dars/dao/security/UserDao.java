package kr.ac.dars.dao.security;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.security.UserDto;

@Mapper
@Repository
public interface UserDao {
    public UserDto getMemberInfo(String id);
}
