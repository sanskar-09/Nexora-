# PowerShell script to start the server with error handling
Write-Host "Starting Nexora Healthcare Backend Server..." -ForegroundColor Cyan

try {
    # Check if server directory exists
    if (-not (Test-Path -Path .\server)) {
        Write-Host "Error: Server directory not found!" -ForegroundColor Red
        exit 1
    }

    # Check if package.json exists in server directory
    if (-not (Test-Path -Path .\server\package.json)) {
        Write-Host "Error: server/package.json not found! Run setup.ps1 first." -ForegroundColor Red
        exit 1
    }

    # Navigate to server directory
    Set-Location -Path .\server

    # Start the server
    Write-Host "Starting server on http://localhost:5000" -ForegroundColor Green
    npm run dev
} catch {
    Write-Host "An error occurred: $_" -ForegroundColor Red
} finally {
    # Make sure we return to the original directory
    Set-Location -Path ..
}
