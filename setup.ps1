# PowerShell script to set up the Nexora healthcare platform
Write-Host "Setting up Nexora Healthcare Platform..." -ForegroundColor Cyan

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location -Path .\server
npm install
Set-Location -Path ..

Write-Host "Setup complete! You can now run the application with:" -ForegroundColor Green
Write-Host "npm run dev     # Frontend only" -ForegroundColor White
Write-Host ".\start-server.ps1     # Backend only" -ForegroundColor White
Write-Host "npm run dev:full     # Both frontend and backend" -ForegroundColor White
