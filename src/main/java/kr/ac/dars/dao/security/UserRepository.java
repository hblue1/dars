package kr.ac.dars.dao.security;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.ac.dars.model.security.User;

public interface UserRepository extends JpaRepository<User, String>{
    User findOneById(String id);
}
