# News Hub

## 📂 Folder Structure

```
├── /api   # Laravel API
└── /web   # React (Vite) Project
```

---

## 🚀 Technologies Used

### Backend (Laravel API)

- **L5 Swagger** - Generate OpenAPI/Swagger specification.
- **Eloquent Filter** - Filter Eloquent Models and their relationships via query parameters.
- **Laravel Sanctum** - Token-based authentication.

### Frontend (React)

- **React.js + TypeScript** - Modern frontend framework with type safety.
- **TailwindCSS + DaisyUI** - Efficient styling and UI components.
- **GSAP** - Animation library for smooth UI interactions.
- **React Router** - Client-side routing.
- **Zod** - Schema validation (used for form validation).
- **react-hook-form** - Type-safe form state, data, and error handling.
- **openapi-typescript** - Converts OpenAPI schemas to TypeScript.
- **openapi-fetch** - Type-safe fetch client based on OpenAPI schemas.
- **React Query** - Manages async state and API interactions.

---

## 🏛️ Architecture

### News Aggregation Workflow

- **NewsAggregatorService** - Fetches news from different sources.
- **FetchNewsJob** - A Job that uses `NewsAggregatorService` to fetch and store news.
- **FetchNewsCommand** - CLI command that triggers `NewsAggregatorService` manually.

### Job Execution & Scheduling

- **API**:
  - **Scheduler** - Posts jobs to a queue every 2 minutes.
  - **Queue Worker** - Processes queued jobs stored in the database.
  - **Console Command** - Provides manual execution of news fetching.
- **Supervisor** - Manages API processes in Docker container:
  - `serve` - Runs the API server.
  - `schedule:work` - Handles scheduled tasks.
  - `queue:work` - Executes queued jobs.

---

## 🛠️ Commands

### Backend (Laravel API)

```bash
php artisan l5-swagger:generate    # Generates OpenAPI documentation.
php artisan news:fetch             # Manually fetch news (for testing).
php artisan schedule:work          # Registers jobs in the queue periodically.
php artisan queue:work             # Executes jobs from the queue.
```

### Frontend (React)

```bash
npm run types:generate   # Reads OpenAPI docs and generates TypeScript types.
```

### Docker

```bash
docker-compose up -d   # Runs Docker containers.
```

📌 **Note:** The `/api/docker-start.sh` script runs migrations and starts Supervisor to manage API processes.

---

## 🔗 URLs

- **PHPMyAdmin** - [http://localhost:5000/](http://localhost:5000/)
- **Swagger API Docs** - [http://localhost:8000/api/documentation](http://localhost:8000/api/documentation)
- **Frontend App** - [http://localhost:3000/](http://localhost:3000/)

---

## 📰 News Sources

- The Guardian
- New York Times
- NewsAPI
