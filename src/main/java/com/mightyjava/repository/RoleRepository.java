package com.mightyjava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mightyjava.domain.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}