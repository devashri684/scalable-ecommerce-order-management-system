# Scalable E-Commerce Order Management System

A production-style **E-Commerce Order Management System** built using **Java, Spring Boot, and Microservices Architecture**.

This project is being developed incrementally to demonstrate the design and implementation of a scalable, distributed e-commerce backend using modern Java and Spring technologies.

## 🚧 Project Status

**Currently in development**

### ✅ Implemented

* Product Service
* RESTful APIs
* Product CRUD operations
* MongoDB integration
* Spring Data MongoDB
* Docker configuration
* Maven
* Git & GitHub

### 🔮 Planned

* Order Service
* Inventory Service
* Inter-Service Communication
* Apache Kafka
* API Gateway
* Keycloak Security
* JWT Authentication
* Circuit Breaker using Resilience4j
* OpenAPI / Swagger Documentation
* Angular Frontend
* Observability using Grafana Stack
* Kubernetes Deployment

---

## 🏗️ Architecture

The final application will follow a microservices architecture:

```text
                         ┌─────────────────┐
                         │  Angular Client │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   API Gateway   │
                         └────────┬────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
                ▼                 ▼                 ▼
        ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
        │   Product    │  │    Order     │  │  Inventory   │
        │   Service    │  │   Service    │  │   Service    │
        └──────────────┘  └──────────────┘  └──────────────┘
                                  │
                                  ▼
                           ┌─────────────┐
                           │    Kafka    │
                           └─────────────┘
```

---

## 🧩 Microservices

### Product Service ✅

The Product Service is currently implemented and provides APIs for managing products.

**Responsibilities:**

* Create products
* Retrieve all products
* Retrieve a product by ID
* Update products
* Delete products
* Store product information in MongoDB

### Order Service 🚧

Planned responsibilities:

* Create orders
* Validate product information
* Communicate with Inventory Service
* Publish order events
* Manage order lifecycle

### Inventory Service 🚧

Planned responsibilities:

* Check product availability
* Manage stock
* Update inventory
* Respond to inventory requests

### API Gateway 🚧

The API Gateway will provide a single entry point for clients and route requests to the appropriate microservice.

---

## 🔄 Inter-Service Communication

The application will use REST-based communication for synchronous communication between services.

Example:

```text
Order Service
      │
      │ HTTP Request
      ▼
Inventory Service
      │
      ▼
Check Product Availability
```

WireMock will be introduced for testing service-to-service interactions.

---

## 📨 Event-Driven Architecture

Apache Kafka will be used for asynchronous communication between microservices.

Planned flow:

```text
Order Service
      │
      │ Order Created Event
      ▼
    Kafka
      │
      ▼
Inventory Service
```

This architecture will help reduce coupling between services and support scalable event-driven processing.

---

## 🔐 Security

Security will be implemented using **Keycloak**.

Planned security features:

* OAuth 2.0
* OpenID Connect
* JWT Authentication
* Role-Based Authorization
* Protected REST APIs

Planned flow:

```text
User
 │
 ▼
Keycloak
 │
 │ JWT Token
 ▼
API Gateway
 │
 ▼
Microservices
```

---

## 🛡️ Circuit Breaker

**Resilience4j** will be introduced to improve application resilience.

Planned flow:

```text
Order Service
      │
      ▼
Circuit Breaker
      │
      X
Inventory Service
      │
      ▼
Fallback Response
```

---

## 📚 API Documentation

REST APIs will be documented using:

* OpenAPI
* Swagger UI

This will make it easier to understand and test the APIs provided by each microservice.

---

## 📊 Observability

The project will include an observability stack for monitoring the distributed application.

Planned technologies:

* Grafana
* Prometheus
* Loki
* Tempo

The observability stack will provide:

* Metrics
* Logs
* Distributed tracing
* Application monitoring

---

## 🐳 Docker

Docker is used for containerized development.

Docker Compose will be used to manage application dependencies and supporting infrastructure as the project grows.

Example:

```bash
docker compose up -d
```

---

## ☸️ Kubernetes

Kubernetes deployment configurations will be added in a later stage.

Planned architecture:

```text
                    Kubernetes Cluster
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     Product Pod      Order Pod       Inventory Pod
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
                         Kafka
```

---

## 🛠️ Tech Stack

| Technology           | Purpose                        |
| -------------------- | ------------------------------ |
| Java                 | Programming Language           |
| Spring Boot          | Backend Development            |
| Spring Cloud         | Microservices Infrastructure   |
| Spring Data MongoDB  | Database Integration           |
| MongoDB              | Database                       |
| Apache Kafka         | Event Streaming                |
| Spring Cloud Gateway | API Gateway                    |
| Keycloak             | Authentication & Authorization |
| Resilience4j         | Circuit Breaker                |
| OpenAPI / Swagger    | API Documentation              |
| Docker               | Containerization               |
| Kubernetes           | Container Orchestration        |
| Grafana              | Monitoring & Visualization     |
| Prometheus           | Metrics                        |
| Loki                 | Logging                        |
| Tempo                | Distributed Tracing            |
| Angular              | Frontend                       |
| Maven                | Build Tool                     |
| Git & GitHub         | Version Control                |

---

## 📁 Project Structure

### Current Structure

```text
scalable-ecommerce-order-management-system/
│
├── product-service/
│   ├── .mvn/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── docker-compose.yml
├── .gitignore
├── .gitattributes
└── README.md
```

### Planned Structure

```text
scalable-ecommerce-order-management-system/
│
├── product-service/
├── order-service/
├── inventory-service/
├── api-gateway/
├── frontend/
├── kubernetes/
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ▶️ Getting Started

### Prerequisites

For the currently implemented Product Service:

* Java 17+
* Maven
* MongoDB
* Docker
* Git

### Clone the Repository

```bash
git clone https://github.com/devashri684/scalable-ecommerce-order-management-system.git
```

```bash
cd scalable-ecommerce-order-management-system
```

### Run Product Service

Navigate to the Product Service:

```bash
cd product-service
```

Build the application:

```bash
mvn clean install
```

Run the application:

```bash
mvn spring-boot:run
```

---

## 🧪 API Testing

The Product Service APIs can be tested using:

* Postman
* Swagger UI

Current API operations:

```text
POST   /api/products
GET    /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}
```

> API paths may change as the project evolves.

---

## 📌 Learning Objectives

This project is designed to demonstrate practical understanding of:

* Microservices Architecture
* Spring Boot
* Spring Cloud
* REST API Development
* MongoDB
* Inter-Service Communication
* Event-Driven Architecture
* Apache Kafka
* API Gateway
* Authentication & Authorization
* Circuit Breaker Pattern
* API Documentation
* Docker
* Kubernetes
* Application Observability

---

## 🔮 Future Improvements

* [ ] Implement Order Service
* [ ] Implement Inventory Service
* [ ] Implement API Gateway
* [ ] Add inter-service communication
* [ ] Integrate Apache Kafka
* [ ] Add Keycloak security
* [ ] Add Circuit Breaker
* [ ] Add OpenAPI documentation
* [ ] Build Angular frontend
* [ ] Add observability
* [ ] Add Kubernetes deployment
* [ ] Add automated integration tests
* [ ] Add CI/CD pipeline
* [ ] Deploy the application to a cloud platform

---

## 👩‍💻 Author

**Devashri Rewanwar**

B.Tech – Electronics & Telecommunication Engineering

Interested in **Java Backend Development, Spring Boot, Microservices, Cloud, and Software Engineering**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
