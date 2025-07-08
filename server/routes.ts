import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  generateToken, 
  hashPassword, 
  comparePassword, 
  authenticateToken, 
  generateOTP,
  AuthRequest 
} from "./auth";
import { 
  loginSchema, 
  signupSchema, 
  otpVerificationSchema,
  insertNoteSchema,
  type LoginRequest,
  type SignupRequest,
  type OtpVerificationRequest 
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware
  const handleValidationError = (error: any, res: any) => {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map(e => ({
          path: e.path.join("."),
          message: e.message
        }))
      });
    }
    console.error("Server error:", error);
    return res.status(500).json({ message: "Internal server error" });
  };

  // Auth routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const data = signupSchema.parse(req.body) as SignupRequest;
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await hashPassword(data.password);
      
      // Create user
      const user = await storage.createUser({
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        isEmailVerified: false
      });

      // Generate OTP
      const otpCode = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      
      await storage.createOtpCode({
        email: data.email,
        code: otpCode,
        expiresAt
      });

      // TODO: Send OTP via email
      console.log(`OTP for ${data.email}: ${otpCode}`);

      res.status(201).json({
        message: "User created successfully. Please verify your email.",
        email: data.email
      });
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.post("/api/auth/verify-otp", async (req, res) => {
    try {
      const data = otpVerificationSchema.parse(req.body) as OtpVerificationRequest;
      
      const otpRecord = await storage.getValidOtpCode(data.email, data.code);
      if (!otpRecord) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // Mark OTP as used
      await storage.markOtpAsUsed(otpRecord.id);

      // Update user as verified
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await storage.updateUser(user.id, { isEmailVerified: true });

      // Generate JWT token
      const token = generateToken(user);

      res.json({
        message: "Email verified successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: user.profileImageUrl
        }
      });
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body) as LoginRequest;
      
      const user = await storage.getUserByEmail(data.email);
      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePassword(data.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!user.isEmailVerified) {
        return res.status(401).json({ message: "Please verify your email first" });
      }

      const token = generateToken(user);

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: user.profileImageUrl
        }
      });
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.post("/api/auth/resend-otp", async (req, res) => {
    try {
      const { email } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      const otpCode = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      
      await storage.createOtpCode({
        email,
        code: otpCode,
        expiresAt
      });

      // TODO: Send OTP via email
      console.log(`New OTP for ${email}: ${otpCode}`);

      res.json({ message: "OTP sent successfully" });
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.user!.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl
      });
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  // Notes routes
  app.get("/api/notes", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const notes = await storage.getNotesByUserId(req.user!.id);
      res.json(notes);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.post("/api/notes", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const data = insertNoteSchema.parse(req.body);
      const note = await storage.createNote({
        ...data,
        userId: req.user!.id
      });
      res.status(201).json(note);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.put("/api/notes/:id", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const noteId = parseInt(req.params.id);
      const data = insertNoteSchema.parse(req.body);
      
      const note = await storage.updateNote(noteId, req.user!.id, data);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      res.json(note);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.delete("/api/notes/:id", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const noteId = parseInt(req.params.id);
      const deleted = await storage.deleteNote(noteId, req.user!.id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  // User profile routes
  app.put("/api/profile", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { firstName, lastName, profileImageUrl } = req.body;
      const user = await storage.updateUser(req.user!.id, {
        firstName,
        lastName,
        profileImageUrl
      });
      
      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl
      });
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
