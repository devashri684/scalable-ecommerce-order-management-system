package com.microservices.product.service;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Import;
import org.testcontainers.mongodb.MongoDBContainer;
import static org.hamcrest.Matchers.*;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ApplicationTests {

	@ServiceConnection
	static MongoDBContainer mongoDBContainer= new MongoDBContainer("mongo:8.0");
	@LocalServerPort
	private Integer port;

	@BeforeEach
	void setup() {
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = 8080; // Changed from 8080 to use the injected variable
	}

	static {
		mongoDBContainer.start();
	}
	@Test
	void shouldCreateProduct() {
    String requestBody= """
		
			{
				"name":"iphone15",
					"description": "it is an Smartphone",
					"price":"30000"
			}
		""";
	RestAssured.given()
			.contentType("application/json")
			.body(requestBody)
			.when()
			.post("/api/product")
			.then()
			.statusCode(201)
			.body("id", notNullValue())
			.body("name", equalTo("iPhone 15"))
			.body("description", equalTo("it is an Smartphone"))
			.body("price", equalTo(30000));
	}

}
