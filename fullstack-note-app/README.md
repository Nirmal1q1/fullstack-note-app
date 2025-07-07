# NoteKeeper - Full-Stack Note-Taking Application

A modern, responsive note-taking application built with React, Express.js, and PostgreSQL. Features secure authentication with email/OTP verification and Google OAuth integration.

## 🚀 Features

- **Authentication System**
  - Email/password signup with OTP verification
  - Secure login with JWT tokens
  - Google OAuth integration (optional)
  - Persistent sessions with automatic logout

- **Note Management**
  - Create, view, and delete personal notes
  - Real-time word count
  - Responsive card-based layout
  - Optimistic UI updates

- **User Experience**
  - Clean, modern UI with shadcn/ui components
  - Mobile-first responsive design
  - Dark mode ready (CSS variables)
  - Loading states and error handling
  - Toast notifications for user feedback

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management
- **shadcn/ui** components built on Radix UI
- **TailwindCSS** for styling
- **React Hook Form** with Zod validation

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for type-safe database operations
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for request validation

### Database
- **PostgreSQL** (configured for Neon serverless)
- **In-memory storage** for development (easily switchable to PostgreSQL)

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 20+ installed
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notekeeper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup** (Optional)
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your-super-secret-jwt-key
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   DATABASE_URL=your-postgresql-connection-string
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   ├── pages/         # Page components
│   │   └── main.tsx       # Application entry point
│   └── index.html
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage interface and implementation
│   └── vite.ts           # Vite integration for development
├── shared/               # Shared schemas and types
│   └── schema.ts         # Database schemas and validation
└── package.json
```

## 🔐 Authentication Flow

### Email/OTP Signup
1. User provides email, first name, last name, and password
2. System validates input and creates unverified user account
3. OTP code is generated and sent to user's email (logged to console in development)
4. User enters OTP to verify account
5. Upon verification, user receives JWT token and is logged in

### Login
1. User provides email and password
2. System validates credentials against stored bcrypt hash
3. JWT token is issued for authenticated sessions
4. Token is stored in localStorage for persistence

### Google OAuth
1. User clicks "Continue with Google" button
2. Google credential is processed (mocked in development)
3. User account is created or retrieved
4. JWT token is issued for the session

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/verify-otp` - Verify email with OTP code
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/resend-otp` - Resend OTP verification code
- `POST /api/auth/google` - Google OAuth authentication

### User Management
- `GET /api/user/profile` - Get authenticated user profile

### Notes
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create new note
- `DELETE /api/notes/:id` - Delete specific note

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes (when using PostgreSQL)

### Database Setup

The application uses in-memory storage by default for easy development. To use PostgreSQL:

1. Set up a PostgreSQL database (local or cloud like Neon)
2. Add `DATABASE_URL` to your environment variables
3. Update the storage implementation in `server/storage.ts`
4. Run `npm run db:push` to apply schema

### Adding Features

1. **Database Changes**: Update schemas in `shared/schema.ts`
2. **API Routes**: Add endpoints in `server/routes.ts`
3. **Storage**: Update interface in `server/storage.ts`
4. **Frontend**: Add pages in `client/src/pages/` and register in `App.tsx`

## 🚀 Deployment

The application is configured for deployment on platforms like Replit, Vercel, or any Node.js hosting service.

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
- `JWT_SECRET` - Secure secret for JWT token signing
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (optional)
- `NODE_ENV` - Set to "production"

## 🔒 Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Zod schemas for all user inputs
- **CORS Protection**: Configured for production environments
- **Session Management**: Secure token storage and automatic logout

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built on Radix UI primitives for WCAG compliance
- **Loading States**: Skeleton loaders and pending states
- **Error Handling**: User-friendly error messages and toast notifications
- **Optimistic Updates**: Immediate UI feedback for better user experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [TanStack Query](https://tanstack.com/query) for excellent server state management
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations

---

Built with ❤️ using modern web technologies. Ready for production deployment!