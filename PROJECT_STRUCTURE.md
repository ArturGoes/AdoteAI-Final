# AdoteAI Project Structure & Setup Guide

## 📋 Project Overview

This is a **full-stack web application** combining:
- **Frontend**: React TypeScript + Vite + TailwindCSS (AdoteAI UI)
- **Backend**: Spring Boot 3.5.7 + Java 21 LTS + PostgreSQL
- **AI Features**: Rule-Based Case system (RBC), Prolog integration, A* matching algorithm

---

## 📁 Folder Structure

```
adoteai_restapi-springboot/
├── src/
│   ├── main/
│   │   ├── java/com/adotematch/ai/          # Spring Boot Backend (Java 21)
│   │   │   ├── Application.java             # Spring Boot entry point
│   │   │   ├── AIController.java            # REST API endpoints
│   │   │   ├── Animal.java                  # JPA Entity: Animals
│   │   │   ├── Adotante.java                # JPA Entity: Adopters
│   │   │   ├── Abrigo.java                  # JPA Entity: Shelters
│   │   │   ├── MatcherIA.java               # AI matching logic
│   │   │   ├── RBC.java                     # Rule-Based Case system
│   │   │   ├── PrologIntegrator.java        # Prolog integration
│   │   │   └── [other entities & controllers]
│   │   ├── resources/
│   │   │   ├── application.properties       # Spring Boot config (DB, ports)
│   │   │   ├── frontend/                    # React Vite project (source)
│   │   │   │   ├── src/
│   │   │   │   │   ├── App.tsx              # Main React component
│   │   │   │   │   ├── main.tsx             # React entry point
│   │   │   │   │   ├── components/          # Reusable React components
│   │   │   │   │   │   ├── Header.tsx
│   │   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   │   ├── Chatbot.tsx
│   │   │   │   │   │   ├── ui/              # shadcn/ui components
│   │   │   │   │   │   └── [other components]
│   │   │   │   │   ├── pages/               # Page components (routes)
│   │   │   │   │   │   ├── HomePage.tsx
│   │   │   │   │   │   ├── BuscarPage.tsx   # Search page
│   │   │   │   │   │   ├── AnimalProfilePage.tsx
│   │   │   │   │   │   ├── FavoritesPage.tsx
│   │   │   │   │   │   └── NotFound.tsx
│   │   │   │   │   ├── contexts/            # React context providers
│   │   │   │   │   ├── hooks/               # Custom React hooks
│   │   │   │   │   ├── lib/                 # Utility libraries
│   │   │   │   │   ├── data/                # Mock data
│   │   │   │   │   └── index.css            # Global styles
│   │   │   │   ├── dist/                    # Built frontend (production)
│   │   │   │   ├── package.json             # Frontend dependencies
│   │   │   │   ├── vite.config.ts           # Vite build config
│   │   │   │   ├── tsconfig.json            # TypeScript config
│   │   │   │   └── tailwind.config.ts       # TailwindCSS config
│   │   │   ├── static/                      # Spring Boot serves frontend here
│   │   │   │   ├── index.html               # Built HTML entry
│   │   │   │   └── assets/                  # Built JS, CSS, images
│   │   │   ├── templates/                   # Old HTML templates (legacy)
│   │   │   └── prolog/                      # Prolog knowledge base
│   │   │       ├── dogs.pl
│   │   │       └── vaccines.pl
│   │   └── test/
│   │       └── java/com/adotematch/ai/      # Unit tests
│   ├── pom.xml                              # Maven build config
│   ├── package.json                         # Root npm config (static serve)
│   └── mvnw / mvnw.cmd                      # Maven wrapper
│
├── target/                                  # Built artifacts (JAR, classes)
├── application.properties                   # Database and app config
└── README.md                                # Project documentation
```

---

## 🚀 How to Run the Full Stack

### Prerequisites
1. **Java 21 LTS** - Installed at `~/.jdk/jdk-21/jdk-21.0.1+12` (or set `JAVA_HOME`)
2. **PostgreSQL 12+** - Running on `localhost:5332` (or modify `application.properties`)
   - Database: `ai`
   - User: `ai` / Password: `pass`
3. **Node.js 18+** - For building frontend (npm)

### Step 1: Setup Database
```bash
# PostgreSQL must be running
psql -h localhost -U ai -d ai -p 5332
# Tables auto-create on first run (spring.jpa.hibernate.ddl-auto=create-drop)
```

### Step 2: Build Frontend (Optional - already built)
```bash
cd src/main/resources/frontend
npm install
npm run build
# Frontend built to: dist/
# Copied to: ../../static/
```

### Step 3: Run Spring Boot API + Frontend Together
```powershell
# Set Java 21
$env:JAVA_HOME = "$env:USERPROFILE\.jdk\jdk-21\jdk-21.0.1+12"
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path

# Run via Maven (development)
.\mvnw.cmd spring-boot:run

# OR run JAR (production)
.\mvnw.cmd clean package -DskipTests
java -jar target/ai-0.0.1-SNAPSHOT.jar
```

### Step 4: Access the Application
- **Website**: http://localhost:8080
- **API Base**: http://localhost:8080/api
- **React Router (Hash)**: Pages use hash-based routing (#/)

---

## 🎯 Features & Routes

### Frontend Pages (React)
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Landing page with featured animals |
| `/buscar` | `BuscarPage` | Search & filter animals |
| `/animal/:id` | `AnimalProfilePage` | Detailed animal profile |
| `/favoritos` | `FavoritesPage` | Saved favorites |
| `*` | `NotFound` | 404 page |

### Backend API Endpoints
```
GET  /api/animals              - List all animals
GET  /api/animals/:id          - Get animal by ID
POST /api/animals              - Create new animal
PUT  /api/animals/:id          - Update animal
DELETE /api/animals/:id        - Delete animal

GET  /api/adopters             - List adopters
GET  /api/shelters             - List shelters

POST /api/match                - AI matching (RBC + Prolog)
POST /api/adoption             - Process adoption
```

---

## 🔧 Configuration

### `application.properties` (Backend)
```properties
spring.application.name=ai
spring.datasource.url=jdbc:postgresql://localhost:5332/ai
spring.datasource.username=ai
spring.datasource.password=pass
spring.jpa.hibernate.ddl-auto=create-drop  # Auto-create tables
spring.jpa.show-sql=true                    # Log SQL queries
```

### Frontend Environment
- **Vite Dev Server**: `http://localhost:5173` (development)
- **Production**: Served from `src/main/resources/static/` at port 8080
- **API Calls**: Use `http://localhost:8080/api` or relative paths

---

## 📦 Build Process

### Maven Build Stages
1. **Clean**: Remove old build artifacts
2. **Compile**: Java source → bytecode (Java 21)
3. **Resources**: Copy `application.properties`, frontend static files
4. **Package**: Create JAR with embedded Tomcat
5. **Result**: `target/ai-0.0.1-SNAPSHOT.jar`

### React Build Stages
1. **TypeScript**: Compile `.tsx` → JavaScript
2. **Bundle**: Vite bundler creates optimized assets
3. **Output**: Files in `frontend/dist/`
4. **Deploy**: Copied to `src/main/resources/static/`

---

## 🤖 AI Features

### Components
- **MatcherIA.java**: Main AI engine for matching adopters with animals
- **RBC.java**: Rule-Based Case system using Prolog knowledge base
- **PrologIntegrator.java**: Integration with Prolog solver
- **AStar.java**: A* pathfinding algorithm for optimization
- **CaseBase.java**: Stores and retrieves past adoption cases

### Prolog Knowledge Base
- `prolog/dogs.pl`: Dog breed characteristics & preferences
- `prolog/vaccines.pl`: Vaccination requirements

---

## 🐛 Troubleshooting

### Frontend not loading
- **Issue**: Blank page at `http://localhost:8080`
- **Fix**: Rebuild frontend `npm run build` in `src/main/resources/frontend/`

### Database connection refused
- **Issue**: Error on startup about `localhost:5332`
- **Fix**: Install PostgreSQL, create database `ai`, or update `application.properties`

### Java compilation errors
- **Issue**: `error: [Java 21] required classes not found`
- **Fix**: Set `JAVA_HOME` to Java 21 path and rebuild: `.\mvnw.cmd clean compile`

### Port already in use
- **Issue**: `Address already in use: 8080`
- **Fix**: Kill process: `Get-Process -Name java | Stop-Process -Force`

---

## 📝 Development Workflow

### Making Changes

#### Backend (Java)
1. Edit `.java` files in `src/main/java/com/adotematch/ai/`
2. Rebuild: `.\mvnw.cmd clean compile`
3. Run: `.\mvnw.cmd spring-boot:run`
4. Changes require restart

#### Frontend (React)
1. Edit `.tsx` files in `src/main/resources/frontend/src/`
2. Dev server: `cd src/main/resources/frontend && npm run dev`
3. Hot reload: Changes refresh automatically on `http://localhost:5173`
4. For production: Run `npm run build` then restart Spring Boot

### Testing

```bash
# Backend tests
.\mvnw.cmd test

# Frontend tests (if configured)
cd src/main/resources/frontend
npm run test
```

---

## 📚 Technologies

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite 5** - Build tool (3x faster than Webpack)
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **React Router v6** - Client-side routing
- **React Query** - Server state management
- **Zod** - Schema validation

### Backend Stack
- **Spring Boot 3.5.7** - Web framework
- **Java 21 LTS** - Language
- **JPA/Hibernate** - ORM
- **PostgreSQL** - Database
- **Maven** - Build tool

### AI Stack
- **Prolog** - Logic programming for rule engine
- **Rule-Based Case (RBC)** - Case-based reasoning
- **A* Algorithm** - Pathfinding optimization

---

## ✅ Next Steps

1. **Customize UI**: Edit React components in `src/main/resources/frontend/src/`
2. **Add API Endpoints**: Create new controllers in `src/main/java/.../`
3. **Database Schema**: Modify JPA entities (auto-creates tables)
4. **Deploy**: Build JAR and deploy to cloud (Azure, AWS, Heroku)
5. **Frontend Hosting**: Use `src/main/resources/static/` for static hosting

---

**Happy coding! 🚀**
