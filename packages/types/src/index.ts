export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  CLIENT = 'CLIENT',
}

export enum ClientStatus {
  LEAD = 'LEAD',
  ACTIVE = 'ACTIVE',
  APPLIED = 'APPLIED',
  ACCEPTED = 'ACCEPTED',
  VISA_PENDING = 'VISA_PENDING',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum DossierStage {
  DOSSIER_CREATION = 'DOSSIER_CREATION',
  DOCUMENT_TRANSLATION = 'DOCUMENT_TRANSLATION',
  PRE_ENROLLMENT = 'PRE_ENROLLMENT',
  UNIVERSITY_APPLICATION = 'UNIVERSITY_APPLICATION',
  ADMISSION_GRANTED = 'ADMISSION_GRANTED',
  VISA_PROCEDURE = 'VISA_PROCEDURE',
  ENROLLED = 'ENROLLED',
}

export enum DocumentCategory {
  PASSPORT = 'PASSPORT',
  DIPLOMA = 'DIPLOMA',
  TRANSCRIPT = 'TRANSCRIPT',
  LANGUAGE_CERT = 'LANGUAGE_CERT',
  CV = 'CV',
  MOTIVATION_LETTER = 'MOTIVATION_LETTER',
  OTHER = 'OTHER',
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum DegreeLevel {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  PHD = 'PHD',
}

export enum ProgramStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  OPENING_SOON = 'OPENING_SOON',
  CLOSING_SOON = 'CLOSING_SOON',
  UNKNOWN = 'UNKNOWN',
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface UserUserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  clientId?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserUserPayload;
}

export interface ClientAggregate {
  id: string;
  clientNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  countryOfResidence: string;
  profilePhoto?: string;
  status: ClientStatus;
  assignedAgentId?: string;
  assignedAgentName?: string;
  dossiersCount: number;
  totalPaid: number;
  createdAt: string;
}

export interface ReceiptDTO {
  id: string;
  receiptNumber: string;
  clientId: string;
  clientName: string;
  clientNumber: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  createdByName: string;
  legalDisclaimer: string;
  createdAt: string;
}

export interface ItalyProgramDTO {
  id: string;
  universityName: string;
  universityCity: string;
  programName: string;
  degreeLevel: DegreeLevel;
  studyDomain: string;
  language: string;
  academicYear: string;
  openingDate?: string;
  closingDate?: string;
  applicationFee?: number;
  tuitionFee?: number;
  status: ProgramStatus;
  officialSourceUrl: string;
  lastVerifiedAt: string;
}

export interface ReviewDTO {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  title: string;
  comment: string;
  status: ReviewStatus;
  isFeatured: boolean;
  createdAt: string;
}

export interface DashboardKPIs {
  totalClients: number;
  activeDossiers: number;
  upcomingAppointments: number;
  openTasks: number;
  totalMoneyCollected: number;
  receiptsThisMonth: number;
  pendingReviews: number;
  upcomingDeadlinesCount: number;
}
