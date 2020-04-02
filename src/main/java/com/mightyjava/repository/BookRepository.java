package com.mightyjava.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mightyjava.domain.Book;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

    @Query("From Book b WHERE b.title=:searchText OR b.author=:searchText OR b.language=:searchText OR b.genre=:searchText ORDER BY b.price DESC")
    Page<Book> findAllBooks(Pageable pageable, @Param("searchText") String searchText);
}
