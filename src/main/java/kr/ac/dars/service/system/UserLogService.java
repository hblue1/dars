package kr.ac.dars.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.dars.dao.system.UserLogDao;
import kr.ac.dars.dto.system.UserLogDto;

@Service
@Transactional
public class UserLogService {
    @Autowired
    private UserLogDao dao;

    public void insertUserLog(UserLogDto dto) {
        dao.insertUserLog(dto);
    }

    public List<UserLogDto> getUserLog() {
        return dao.getUserLog();
    }

    
}
