package kr.ac.dars.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import kr.ac.dars.model.User;

@Data
@NoArgsConstructor
public class UserDto {
    private String id;
    private String password;
    private String name;

    public User toEntity() {
		return User.builder().id(id).password(password).name(name).build();
	}
}
