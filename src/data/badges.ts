export type Difficulty = "Introductory" | "Intermediate" | "Advanced";
export type BadgeStatus = "Completed" | "Missing";

export interface Badge {
  id: string;
  name: string;
  category: string;
  points: number;
  difficulty: Difficulty;
  duration: string;
  description: string;
  youtubeId: string;
  labUrl: string;
  notesUrl: string;
  status: BadgeStatus;
}

export const badges: Badge[] = [
  { id: "b1", name: "Gemini for Developers", category: "AI / ML", points: 2, difficulty: "Intermediate", duration: "45m", description: "Build generative AI features with the Gemini API.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Missing" },
  { id: "b2", name: "Cloud Run Fundamentals", category: "Serverless", points: 2, difficulty: "Introductory", duration: "30m", description: "Deploy containers to Cloud Run.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Missing" },
  { id: "b3", name: "Vertex AI Search", category: "AI / ML", points: 3, difficulty: "Advanced", duration: "1h 15m", description: "Implement enterprise search with Vertex AI.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Missing" },
  { id: "b4", name: "BigQuery Analytics", category: "Data", points: 2, difficulty: "Intermediate", duration: "50m", description: "Run analytical queries at petabyte scale.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Missing" },
  { id: "b5", name: "Cloud Storage Essentials", category: "Storage", points: 1, difficulty: "Introductory", duration: "25m", description: "Object storage fundamentals on GCP.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b6", name: "Kubernetes Engine Basics", category: "Containers", points: 3, difficulty: "Intermediate", duration: "1h", description: "Run containerized apps on GKE.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b7", name: "Cloud Functions 2nd Gen", category: "Serverless", points: 2, difficulty: "Intermediate", duration: "40m", description: "Event-driven functions on Google Cloud.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b8", name: "IAM & Security", category: "Security", points: 2, difficulty: "Intermediate", duration: "45m", description: "Identity and access management on GCP.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b9", name: "Pub/Sub Messaging", category: "Data", points: 2, difficulty: "Intermediate", duration: "35m", description: "Asynchronous messaging at scale.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b10", name: "Dataflow Streaming", category: "Data", points: 3, difficulty: "Advanced", duration: "1h 20m", description: "Stream processing with Apache Beam.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Missing" },
  { id: "b11", name: "Looker Studio Dashboards", category: "Data", points: 1, difficulty: "Introductory", duration: "30m", description: "Build interactive BI dashboards.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b12", name: "Cloud SQL for PostgreSQL", category: "Data", points: 2, difficulty: "Introductory", duration: "40m", description: "Managed PostgreSQL on Google Cloud.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b13", name: "Firebase Authentication", category: "Mobile", points: 1, difficulty: "Introductory", duration: "30m", description: "Auth for web and mobile apps.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b14", name: "Firestore Data Modeling", category: "Mobile", points: 2, difficulty: "Intermediate", duration: "45m", description: "NoSQL document data modeling.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b15", name: "Cloud Build CI/CD", category: "DevOps", points: 2, difficulty: "Intermediate", duration: "50m", description: "Automated build pipelines.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b16", name: "Artifact Registry", category: "DevOps", points: 1, difficulty: "Introductory", duration: "25m", description: "Container & package registry.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b17", name: "Compute Engine VMs", category: "Compute", points: 1, difficulty: "Introductory", duration: "30m", description: "Provision and manage VMs.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b18", name: "Load Balancing", category: "Networking", points: 2, difficulty: "Intermediate", duration: "45m", description: "Global HTTP(S) load balancing.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b19", name: "VPC Networking", category: "Networking", points: 2, difficulty: "Intermediate", duration: "50m", description: "Virtual private cloud design.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b20", name: "Cloud Monitoring", category: "Observability", points: 1, difficulty: "Introductory", duration: "30m", description: "Metrics, dashboards, and alerts.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b21", name: "Cloud Logging", category: "Observability", points: 1, difficulty: "Introductory", duration: "25m", description: "Centralized log management.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b22", name: "Secret Manager", category: "Security", points: 1, difficulty: "Introductory", duration: "25m", description: "Store API keys and credentials securely.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b23", name: "App Engine Standard", category: "Serverless", points: 2, difficulty: "Intermediate", duration: "40m", description: "Fully managed PaaS.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Completed" },
  { id: "b24", name: "Cloud Spanner", category: "Data", points: 3, difficulty: "Advanced", duration: "1h", description: "Globally distributed SQL database.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Missing" },
  { id: "b25", name: "Document AI", category: "AI / ML", points: 3, difficulty: "Advanced", duration: "1h 10m", description: "Extract structured data from documents.", youtubeId: "dQw4w9WgXcQ", labUrl: "https://www.cloudskillsboost.google/", notesUrl: "#", status: "Missing" },
];

export const recommendationReasons: Record<string, string> = {
  b1: "Your AI/ML completions show readiness for Gemini APIs.",
  b2: "You completed Cloud Functions — Cloud Run is the next step.",
  b3: "Builds on your BigQuery and AI experience.",
  b4: "High-value badge that complements your data stack.",
};