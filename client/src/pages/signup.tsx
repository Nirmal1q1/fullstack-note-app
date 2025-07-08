import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupRequest, signupSchema } from "@shared/schema";
import { useSignup } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { StickyNote } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
  const [, setLocation] = useLocation();
  const signupMutation = useSignup();

  const form = useForm<SignupRequest & { confirmPassword: string }>({
    resolver: zodResolver(signupSchema.extend({
      confirmPassword: signupSchema.shape.password,
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: SignupRequest & { confirmPassword: string }) => {
    try {
      await signupMutation.mutateAsync({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setLocation(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    console.log("Google signup not implemented yet");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <StickyNote className="inline mr-2 text-primary" />
            NoteSync
          </h1>
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-indigo-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="py-8 px-4 sm:px-10">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  {...form.register("firstName")}
                  className="mt-1"
                />
                {form.formState.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.firstName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  {...form.register("lastName")}
                  className="mt-1"
                />
                {form.formState.errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.lastName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                  className="mt-1"
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  {...form.register("password")}
                  className="mt-1"
                />
                {form.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.password.message}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Password must be at least 8 characters long and contain numbers and letters.
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...form.register("confirmPassword")}
                  className="mt-1"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="ml-2 text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:text-indigo-500">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:text-indigo-500">Privacy Policy</a>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignup}
                  className="w-full"
                >
                  <FaGoogle className="mr-2 text-red-500" />
                  Sign up with Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
