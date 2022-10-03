package kr.ac.dars.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Data
@Entity
@Table(name = "userinfo")
public class User {
    @Id
	@Column(name = "id")
	private String id;
 
	@Column(name = "password")
	private String password;
 
	@Column(name = "name")
	private String name;
 
	@Builder
	public User(String id, String password, String name) {
		this.id = id;
		this.password = password;
		this.name = name;
	}
}
