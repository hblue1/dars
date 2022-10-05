package kr.ac.dars.service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.dars.dao.security.UserLogDao;
import kr.ac.dars.dto.security.UserLogDto;

@Service
@Transactional
public class UserLogService {
    @Autowired
    private UserLogDao dao;

    public void insertUserLog(UserLogDto dto) {
        dao.insertUserLog(dto);
    }
}
