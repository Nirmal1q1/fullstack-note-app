import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpVerificationRequest, otpVerificationSchema } from "@shared/schema";
import { useVerifyOtp, useResendOtp } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

export default function OtpVerification() {
  const [, setLocation] = useLocation();
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  // Get email from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email") || "";

  const form = useForm<OtpVerificationRequest>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      email,
      code: "",
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const onSubmit = async (data: OtpVerificationRequest) => {
    try {
      await verifyOtpMutation.mutateAsync(data);
      setLocation("/");
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    
    try {
      await resendOtpMutation.mutateAsync(email);
      setTimer(60);
      setCanResend(false);
    } catch (error) {
      // Error is handled by the mutation
    }
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
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to{" "}
            <span className="font-medium">{email}</span>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="py-8 px-4 sm:px-10">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  {...form.register("code")}
                  className="mt-1 text-center text-2xl tracking-widest"
                />
                {form.formState.errors.code && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.code.message}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Enter the 6-digit code from your email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={verifyOtpMutation.isPending}
              >
                {verifyOtpMutation.isPending ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || resendOtpMutation.isPending}
                  className="font-medium text-primary hover:text-indigo-500 disabled:text-gray-400"
                >
                  {resendOtpMutation.isPending ? "Sending..." : "Resend code"}
                </button>
              </p>
            </div>

            {!canResend && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Resend code in <span className="font-medium text-primary">{timer}</span> seconds
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
