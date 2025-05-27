# PowerShell script to start the entire Nexora healthcare platform
Write-Host "Starting Nexora Healthcare Platform..." -ForegroundColor Cyan

# Check if npx is available
try {
    $npxVersion = npx --version
    Write-Host "Using npx version: $npxVersion" -ForegroundColor Gray
} catch {
    Write-Host "Error: npx not found. Please make sure Node.js is installed properly." -ForegroundColor Red
    exit 1
}

# Run the application using concurrently
Write-Host "Starting frontend and backend servers..." -ForegroundColor Yellow
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Green
Write-Host "Backend API will be available at: http://localhost:5000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow

# Run the dev:full script
npm run dev:full
