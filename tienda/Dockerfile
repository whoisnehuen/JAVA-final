# Etapa de construcción (usamos Maven con Java 25)
FROM maven:3.9-eclipse-temurin-25 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa de ejecución (usamos solo el entorno de ejecución de Java 25 para que sea más liviano)
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]