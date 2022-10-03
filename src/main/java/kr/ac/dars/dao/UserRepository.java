package kr.ac.dars.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.ac.dars.model.User;

public interface UserRepository extends JpaRepository<User, String>{
    User findOneById(String id);
}
