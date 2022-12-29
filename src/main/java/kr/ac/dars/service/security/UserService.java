package kr.ac.dars.service.security;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.ac.dars.dao.security.RoleRepository;
import kr.ac.dars.dao.security.UserDao;
import kr.ac.dars.dao.security.UserRepository;
import kr.ac.dars.dto.security.UserDto;
import kr.ac.dars.model.security.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDao dao;

    public void insert(UserDto userDto) {
        userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        Set<Role> rolesSet = new HashSet<Role>();
        rolesSet.add(roleRepository.findQneById(3L));
        userRepository.save(userDto.toEntity(rolesSet));
    }

    public UserDto getMemberInfo(String id) {
        return dao.getMemberInfo(id);
    }
}
