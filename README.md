# AgriVision: Precision Agriculture Platform

AgriVision is a comprehensive precision agriculture platform that combines IoT sensors, satellite imagery, and machine learning to provide farmers and agronomists with actionable insights for optimizing crop yield and resource management.

## Architecture Overview

AgriVision uses a hybrid cloud-edge architecture:

- **Edge Component**: On-farm gateways collect sensor data and perform initial preprocessing
- **Cloud Backend**: AWS cloud services for storage, machine learning, and advanced analytics
- **Mobile/Web Clients**: Interfaces for farmers and agronomists to monitor and manage farm operations

![AgriVision Architecture](https://mermaid.ink/img/pako:eNqNVE1v2zAM_SuETk1Rp3XaZkNRdMAOGwYU2K7pYUUFxVZiYbIUUHLcFP3voxwndpzCww6W-Ph-SFGekTItOJnJs1A-7BkXglrgDQy3fgn-PpwF43o7CvauQQj2IIV0wKXxDJGNhbLgmJCVNgvHGIxkJ2A-XE5-PIF0jtO7sWZxkTTtSPXs-Hx8LdgZJe6dZHC0zNAGmrTpabYZDSyMVtJJWJbGsOvsfnb_xdLQYKT2YmwAK0sK12IQYW29qPTlzZzRk1oxTzhTsK2M7hzWRzP6YbytfC0ZBd8hH0pbpIJLJuXSYwZbLnzMfm1QMZ0jYnY9v5CmYH_hGrD9QWl9oMtDTv3eSS3Wnl7OxkOdwbxG3YIPd-OMrKtAKJ7_3KLcJW19C0b-g1lDHRXuLHDa0O5s2PWTqmwdWHXrIz3P07tXFzO1DM_eMH7XZE9AJ_Fj5iWdB_iAVQunRRf6Tqoe6QlnkSNmv-t6U5C2o2qzZJuunqZS8g29vKEvTa_G5f4PVN8EyVpgtzLYXS9o4tZGe3DZXpSzSdhAYe0WfJNGvZmEQP5eE5LEq3pMsrD0SuTbvYDSuDC-q0_RQHcVMIVq4iWpEwkymYdB4wlvG3d47hbw8G9lNjqZlXbGe-sljX7lU5fkBw5X2qyeOFBsMb5kS1yVeIXlFa_IfMr34SIvEqgw-MRTEo_i6fXV9Wp1_RNfJvSQbMnUVRrTadIpTug8j6eTKH-YTQcl8u5U6YzMa1VqIVn4UluGzSmHZnihpRdyHm6NLskRBcwzrC5rw_HuK7O2jY6lPSzIvydVJpTdnykzpxHrWqSKxKzA1VJVLUrWpKGl7w2K3gzxsexciBw73VPxH7mhc08)

## Data Flow Overview

1. **Sensor Data Collection**:
   - Field sensors collect environmental data (soil moisture, temperature, pH)
   - Edge gateways aggregate and preprocess data
   - Processed data is sent to the cloud when connectivity is available

2. **Image Processing**:
   - Drone/satellite imagery is processed for NDVI and crop health analysis
   - ML models detect issues such as pest infestations or nutrient deficiencies

3. **Analytics & Recommendations**:
   - Historical and real-time data are combined for predictive analytics
   - ML models generate recommendations for irrigation, fertilization, and pest control

4. **User Interfaces**:
   - Web portal for comprehensive management and analysis
   - Mobile app for field-based monitoring and quick actions

## Core Features

- **User Management**: Role-based access for Admins, Agronomists, and Farmers
- **Field Mapping**: GIS-based field mapping with crop rotation history
- **Sensor Integration**: Real-time monitoring of soil and environmental conditions
- **Crop Health Visualization**: NDVI maps and vegetation indices
- **Alert System**: Automated notifications for critical conditions
- **Recommendations Engine**: AI-driven suggestions for farm management
- **Report Generation**: Exportable reports in PDF/CSV formats
- **Weather Integration**: Hyperlocal weather forecasting and historical data

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js microservices
- **Database**: PostgreSQL with PostGIS extension
- **Storage**: AWS S3
- **IoT & Messaging**: AWS IoT Core (MQTT)
- **ML**: TensorFlow/PyTorch models via AWS SageMaker

## Getting Started

### Prerequisites

- Node.js v18 or higher
- PostgreSQL 14 or higher with PostGIS extension
- AWS account for cloud services

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/agrivision.git

# Install dependencies
cd agrivision
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run the development server
npm run dev
```

## Deployment

The application can be deployed using the included Terraform scripts and GitHub Actions workflows. See the `/infrastructure` directory for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.