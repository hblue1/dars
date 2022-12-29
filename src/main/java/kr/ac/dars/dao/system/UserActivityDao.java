package kr.ac.dars.dao.system;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.system.UserActivityDto;

@Mapper
@Repository
public interface UserActivityDao {
    public void insertUserActivity(UserActivityDto dto);
    public List<UserActivityDto> getUserActivity(String id);
}
