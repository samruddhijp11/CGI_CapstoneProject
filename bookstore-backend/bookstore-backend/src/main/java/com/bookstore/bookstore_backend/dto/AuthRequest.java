package com.bookstore.bookstore_backend.dto;
import lombok.Data;

@Data
public class AuthRequest {
    public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public AuthRequest() {}
	
	
	private String email;
    private String password;
}
