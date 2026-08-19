package co.microservices.inventory_service;


import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class InventoryServiceApplicationTests {

	@ServiceConnection
	@Container
	static MySQLContainer<?> mySQLContainer = new MySQLContainer<>("mysql:8.3.0");

	@LocalServerPort
	private Integer port;

	@BeforeEach
	void setup() {
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = port;
	}

	@Test
	void shouldReturnTrueWhenProductIsInStock() {
		// According to V2__add_inventory.sql: iphone_15 has quantity 100
		RestAssured.given()
				.queryParam("skuCode", "iphone_15")
				.queryParam("quantity", 100)
				.when()
				.get("/api/inventory")
				.then()
				.statusCode(200)
				.body(is("true"));
	}

	@Test
	void shouldReturnFalseWhenProductIsOutOfStock() {
		// Requesting 101 when only 100 are available in DB
		RestAssured.given()
				.queryParam("skuCode", "iphone_15")
				.queryParam("quantity", 101)
				.when()
				.get("/api/inventory")
				.then()
				.statusCode(200)
				.body(is("false"));
	}

	@Test
	void shouldReturnFalseWhenProductSkuDoesNotExist() {
		// Requesting a non-existent SKU code
		RestAssured.given()
				.queryParam("skuCode", "non_existent_product")
				.queryParam("quantity", 1)
				.when()
				.get("/api/inventory")
				.then()
				.statusCode(200)
				.body(is("false"));
	}
}