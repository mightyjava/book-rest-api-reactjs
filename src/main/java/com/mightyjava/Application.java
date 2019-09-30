package com.mightyjava;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mightyjava.domain.Book;
import com.mightyjava.service.IService;

@SpringBootApplication
public class Application implements CommandLineRunner {
	
	@Autowired
	private IService<Book> service;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Book book = new Book();
		book.setTitle("Spring Microservices in Action");
		book.setAuthor("John Carnell");
		book.setCoverPhotoURL("https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg");
		book.setIsbnNumber(1617293989L);
		book.setPrice(2776.00);
		book.setLanguage("English");
		service.saveOrUpdate(book);
	}

}
