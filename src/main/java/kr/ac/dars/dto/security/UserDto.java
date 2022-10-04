package kr.ac.dars.dto.security;

import java.util.Set;

import kr.ac.dars.model.security.Role;
import kr.ac.dars.model.security.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private String id;
    private String password;
    private String name;
    private Set<Long> roles;

    public User toEntity(Set<Role> roles) {
		return User.builder().id(id).password(password).name(name).roles(roles).build();
	}
}
