# FullStack Dashboard Assessment

Full-stack administrative panel for managing dashboard manual data with role-based access control.

##### Demo Video:
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/1qBnp0pJczo/hqdefault.jpg)](https://youtu.be/1qBnp0pJczo)

## Frontend
***
The project is built with the following technologies and libraries:
-	React 18: Core library for building the user interface.
-   Vite: Lightning-fast development tool for React.
-	React Router: Handles routing and navigation in the app.
-	Zustand: State management solution for managing global state efficiently.
-	Formik: Simplifies building and handling forms.
-   Yup: Schema-based validation for form inputs.

```
.
├── App.css                     # Global styles for the app.
├── App.tsx                     # Main application component.
├── assets                      # Static assets like images.
│   ├── logo.png                # Default app logo.
│   └── logo_white.png          # Alternative app logo (white version).
├── components                  # Reusable UI components.
│   ├── AccessDenied.tsx        # Component to display "Access Denied" message.
│   ├── Loadable.tsx            # Higher-order component for lazy loading.
│   ├── Loader.tsx              # Loader spinner component.
│   ├── NotFound.tsx            # Component for "404 - Not Found" pages.
│   ├── Sidebar.tsx             # Sidebar navigation component.
│   ├── StatisticsCard.tsx      # Card component for displaying statistics.
│   └── Table.tsx               # Reusable table component for data display.
├── config                      # Configuration files.
│   └── chartConfig.ts          # Configuration for charts used in the app.
├── index.css                   # Base CSS styles.
├── layouts                     # Layout components for the app.
│   ├── PrivateLayout           # Layout for protected pages.
│   │   └── index.tsx           # Private layout component.
│   └── PublicLayout            # Layout for public pages.
│       └── index.tsx           # Public layout component.
├── main.tsx                    # Application entry point.
├── models                      # Type definitions and models.
│   └── route.ts                # Type definitions for routes.
├── pages                       # Page components for different routes.
│   ├── Auth                    # Authentication-related pages.
│   │   └── Login.tsx           # Login page component.
│   ├── Dashboard               # Dashboard-related pages.
│   │   └── index.tsx           # Main dashboard page.
│   ├── Metrics                 # Pages for managing metrics.
│   │   ├── MetricsDetails.tsx  # Detailed view of metrics.
│   │   └── index.tsx           # Main metrics page.
│   ├── UsersManagement         # Pages for user management.
│   │   └── index.tsx           # Main user management page.
│   └── service                 # Service modules for API calls.
│       ├── authService.ts      # API service for authentication.
│       ├── index.ts            # Central export for services.
│       ├── metricsService.ts   # API service for metrics.
│       └── usersService.ts     # API service for users.
├── routes                      # Routing configuration and logic.
│   ├── ProtectedRoute.tsx      # Wrapper for protected routes.
│   ├── index.tsx               # Main routing component.
│   └── routes.ts               # Route definitions.
├── store                       # Zustand store configurations.
│   ├── auth.store.ts           # Auth state management.
│   ├── index.ts                # Central export for stores.
│   ├── metrics.store.ts        # Metrics state management.
│   └── users.store.ts          # User management state.
└── vite-env.d.ts               # TypeScript environment definition for Vite.
```

## Backend
***
The project is built with the following technologies and libraries:
-	Node.js: JavaScript runtime environment.
-	Express.js: Web framework for building REST APIs.
-	TypeScript: Strongly typed superset of JavaScript for type safety and enhanced development experience.
-	Sequelize: ORM for managing database interactions.

```
├── app.ts                  # Main application entry point
├── config
│   └── database.ts         # Database connection and configuration
├── controllers             # Business logic for handling requests
├── middleware
│   └── auth.ts             # Middleware for authentication and authorization
├── models
│   └── index.ts            # Sequelize models and database schema
├── routes
│   ├── auth.ts             # Routes for authentication (login, signup)
│   ├── dataEntries.ts      # Routes for managing data entries
│   ├── metrics.ts          # Routes for managing metrics
│   └── users.ts            # Routes for user management
├── server.ts               # Server setup and initialization
├── services                # Business and reusable service logic (if applicable)
├── types
│   └── express
│       └── index.d.ts      # Custom TypeScript definitions for Express
└── utils
    └── jwt.ts              # Utility functions for handling JWT tokens
```
## Database
- PostgreSQL: Relational database for storing application data.

      INSERT INTO users (email, password, role, department)
      VALUES ('admin@rta.ae', '$2a$12$fSgjX/KZ46V/Nb9wazijO.XPTxZB3Raj7lXKq0z70xY2iM4ScO/KG', 'ADMIN', '');

Passowrd: 123 //
Username: admin@rta.ae

