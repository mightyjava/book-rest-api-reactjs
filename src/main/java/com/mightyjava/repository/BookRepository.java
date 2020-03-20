package com.mightyjava.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.mightyjava.domain.Book;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

}
