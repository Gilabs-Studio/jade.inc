// Lottie Animation Data Type
export type LottieAnimationData = Record<string, unknown>;

// Use Case Types
export interface UseCase {
  title: string;
  client: string;
  type: string;
  period: string;
  size: string;
  cta: string;
}

// Service Types
export interface Service {
  title: string;
  description: string;
  cta: string;
}

