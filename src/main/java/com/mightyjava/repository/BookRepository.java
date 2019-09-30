package com.mightyjava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mightyjava.domain.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
