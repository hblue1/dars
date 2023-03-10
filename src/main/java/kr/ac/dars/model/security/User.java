package kr.ac.dars.model.security;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "user_info")
public class User {
    @Id
	@Column(name = "id")
	private String id;
 
	@Column(name = "password")
	private String password;
 
	@Column(name = "name")
	private String name;

    //이부분 수정
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "user_roles",joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
 
    @Builder
	public User(String id, String password, String name, Set<Role> roles) {
		this.id = id;
		this.password = password;
		this.name = name;
        this.roles = roles;
	}
}
