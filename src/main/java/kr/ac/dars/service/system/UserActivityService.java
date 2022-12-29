package kr.ac.dars.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.dars.dao.system.UserActivityDao;
import kr.ac.dars.dto.system.UserActivityDto;

@Service
@Transactional
public class UserActivityService {
    @Autowired
    private UserActivityDao dao;

    public void insertUserActivity(UserActivityDto dto) {
        dao.insertUserActivity(dto);
    }

    public List<UserActivityDto> getUserActivity(String id) {
        return dao.getUserActivity(id);
    }
}
