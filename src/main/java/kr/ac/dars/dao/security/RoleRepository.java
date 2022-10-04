package kr.ac.dars.dao.security;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.ac.dars.model.security.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findQneById(Long id);
}
