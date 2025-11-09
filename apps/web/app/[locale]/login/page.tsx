import { LoginForm } from "@/src/features/auth/components/ui";
import { LoginCarousel } from "@/src/features/auth/components/ui/login-carousel";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-background">
        <div className="w-full max-w-md mx-auto space-y-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">{`{...}`}</span>
            </div>
            <span className="text-2xl font-bold text-primary">Jade Inc</span>
          </div>

          {/* Welcome Section */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Sign in to access your dashboard and continue optimizing your QA process.
            </p>
          </div>

          {/* Login Form */}
          <div className="pt-2">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Section - Carousel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <LoginCarousel />
      </div>
    </div>
  );
}
