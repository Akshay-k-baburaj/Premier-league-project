# Premier Zone Fantasy!

Your home for everything Premier League related

## Getting Started

Premier Zone Fantasy is a full-stack web application designed to provide football
enthusiasts with an all-in-one platform for everything related to the English Premier League.
The project utilizes a React-based frontend and a Spring Boot backend, with PostgreSQL
serving as the primary database for storing user-related data, comments, and player
information.

The application features multiple components, including real-time match updates, team
standings, player statistics, and historical records. Data for matches, news, and team
comparisons are fetched dynamically from external APIs, ensuring users receive up-to-date
information. Users can search for specific players or teams within the database, and
additional filtering options allow for categorization based on position, nationality, and club
affiliation.

A personalized dashboard aggregates key insights such as today’s matches, upcoming
fixtures, top scorers, and breaking news, offering users quick navigation to relevant sections.
The system supports user authentication via JWT tokens, and newly registered users receive a
welcome email. A comment system is integrated within match detail sections, allowing for
interactive discussions among users.

The project employs modern development tools and frameworks, including VS Code for
frontend development, IntelliJ IDEA for backend development, PostgreSQL managed
through pgAdmin and SQL Shell, Maven as the build tool, and Postman for API testing.
Testing is conducted using JUnit and Mockito, while Spring Caffeine is implemented for
caching to optimize performance. Spring Mail facilitates email notifications, and
FontAwesome enhances UI design with intuitive icons. The project embodies a seamless
blend of functionality and aesthetics, making it a comprehensive resource for Premier League
fans worldwide.

## Tools and Technologies

 ➢ Frontend Technologies
  • React.js – Used for building the user interface, ensuring a responsive and dynamic user experience.
  • FontAwesome – Provides high-quality icons for UI elements.
  • NPM (Node Package Manager) – Manages dependencies and packages in the React project.
  • SCSS – Enhances styling and responsiveness.
  • Canva – Used for designing logos and graphical assets.
  
 ➢ Backend Technologies
  • Spring Boot – Powers the backend with a robust and scalable framework for handling business logic.
  • Java 23 – The programming language used for backend development, ensuring performance and reliability.
  • Spring Security (JWT Authentication) – Secures the application by implementing user authentication and authorization.
  • Spring Mail – Handles email functionality, such as sending welcome emails to new users.
  • Spring Caffeine Cache – Improves performance by caching frequently accessed data.
  • JUnit & Mockito – Used for writing and executing unit and integration tests to ensure backend reliability.
  
 ➢ Database & API
  • PostgreSQL – The relational database used to store user data, comments, and other application-specific records.
  • pgAdmin & SQL Shell (PL/pgSQL) – Tools used for managing and querying the PostgreSQL database.
  • REST APIs (Fetched Data) – Integrated to fetch real-time match updates, team standings, player statistics, news, and head-to-head comparisons.

 ➢ Development & Testing Tools
  • IntelliJ IDEA Community Edition – The primary IDE used for backend development.
  • Visual Studio Code (VS Code) – Used for frontend development.
  • Postman – Used for testing APIs and ensuring proper backend responses.
  • Git & GitHub – Version control system used for tracking changes and collaborating on the project.
  • Browser developer Tools (Chrome) – built-in utilities in web browsers that help developers inspect, debug, and optimize web applications in real time.
