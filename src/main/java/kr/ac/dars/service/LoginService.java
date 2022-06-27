// package kr.ac.dars.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import kr.ac.dars.dao.LoginDao;
// import kr.ac.dars.dto.LoginDto;

// @Transactional
// @Service
// public class LoginService {
//     @Autowired
//     public LoginDao dao;

//     public boolean login(LoginDto dto) {
//         if(dao.login(dto) == 1)
//             return true;
//         else
//             return false;
//     }
// }
