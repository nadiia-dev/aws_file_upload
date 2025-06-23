# AWS File Upload & Search

A full-stack document management application with intelligent search capabilities. Upload PDF and Word documents, and search through their content using AWS OpenSearch. Built with modern technologies and deployed on cloud platforms.

## 🚀 Features

- 📄 **Document Upload**: Upload PDF and Word documents to AWS S3
- 🔍 **Full-Text Search**: Search through document content using AWS OpenSearch
- 📧 **Email Authentication**: Simple email-based login system
- ⚡ **Real-time Processing**: Asynchronous document processing with AWS SQS
- 📱 **Responsive Design**: Modern UI built with React and Tailwind CSS
- 🔄 **State Management**: Efficient state handling with Zustand
- ☁️ **Cloud Deployment**: Backend on Render, Frontend on Vercel

## 🛠️ Tech Stack

### Frontend

- **React** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Deployed on Vercel**

### Backend

- **NestJS** with TypeScript
- **PostgreSQL** database (Docker)
- **AWS S3** for file storage
- **AWS OpenSearch** for document search
- **AWS SQS** for message queuing
- **Deployed on Render**

### Infrastructure

- **AWS EC2** for database deployment
- **Docker Compose** for local development
- **PostgreSQL** in Docker containers

## 📋 Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose
- AWS Account with appropriate services
- Git

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/nadiia-dev/aws_file_upload.git
cd aws_file_upload
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
```

Backend `.env` configuration:

```env
# Database
DATABASE_URL=postgresql://username:password@your-ec2-instance:5432/dbname

# AWS Configuration
ACCESS_KEY_ID=your_access_key
SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET=your-document-bucket-name

# OpenSearch
OPENSEARCH_URL=https://your-opensearch-domain.region.es.amazonaws.com
ADMIN_USER=admin
ADMIN_PASS=your_password

# SQS
SQS_QUEUE_URL=https://sqs.region.amazonaws.com/account/document-processing-queue
SQS_QUEUE=your_queue_name

CLIENT_URL=your_client_url
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create environment file
```

Frontend `.env` configuration:

```env
VITE_API_URL=http://localhost:3001
# For production: https://your-backend-url.render.com

#aws s3 bucker name
VITE_BUCKET=your_bucket_name

#aws region
VITE_REGION=your_region
```

# Start database

docker-compose up -d

# Run migrations

cd backend
npm run migration:run

````

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start database
docker-compose up -d

# Start backend (from backend directory)
npm run start:dev

# Start frontend (from frontend directory)
npm run dev
````
