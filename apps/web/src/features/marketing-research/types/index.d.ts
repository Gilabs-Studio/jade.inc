// Marketing Research Feature Types

export interface ServiceItem {
  title: string;
  description?: string;
}

export interface ProjectManagementItem {
  category: string;
  items: string[];
}

export interface OnlinePlatform {
  name: string;
}

export interface UseCase {
  title: string;
  client: string;
  type: string;
  period: string;
  size: string;
  location?: string;
  challenge: string;
}



