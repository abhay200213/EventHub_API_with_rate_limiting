# New Component Plan

## Project
EventHub API

## Selected Component
express-rate-limit

## Why I Chose It
I chose express-rate-limit because it adds practical security value to the API by limiting repeated requests from the same client. It is manageable within the project timeline and fits well with a RESTful back-end application.

## Purpose
The component will help protect public and sensitive endpoints from abuse, excessive repeated requests, and basic brute-force patterns.

## Planned Integration
I plan to install and configure express-rate-limit as middleware in the Express application. It will be applied:
- globally for general API protection
- more strictly on sensitive routes if needed

## Expected Benefits
- improves API reliability
- reduces abuse risk
- demonstrates understanding of middleware integration
- adds a real-world security feature to the project

## Implementation Plan
1. Install express-rate-limit
2. Create reusable rate limit middleware
3. Apply middleware in app.ts and selected routes
4. Test rate-limited endpoints
5. Document the feature in Swagger/README if applicable

## Why It Fits This Project
EventHub API includes public and authenticated endpoints, so request limiting is a useful enhancement that improves security without adding unnecessary complexity.