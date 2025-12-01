## Critical Fixes for REST API + React Migration

### 1. FIX DEPENDENCIES (pom.xml)
- [ ] Add `spring-boot-starter-security` to `pom.xml` for SecurityConfig and BCryptPasswordEncoder.

### 2. CLEANUP LEGACY CODE (Backend)
- [ ] Confirm and ensure `src/main/java/com/adotematch/ai/WebController.java` is deleted (returns HTML strings, obsolete for React).

### 3. REFACTOR AI CONTROLLER
- [ ] Verify `src/main/java/com/adotematch/ai/AIController.java` is updated to `@RestController` returning `ResponseEntity<Map<String, Object>>` with JSON body for user preferences and RBC logic.

### 4. CLEANUP LEGACY FRONTEND
- [ ] DELETE the folder `src/main/resources/templates` (obsolete server-side HTML files conflicting with React in `src/main/resources/frontend`).
