# Elevated script to stop and start the service
$scriptPath = Join-Path $PSScriptRoot "stop-service.ps1"

$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($isAdmin) {
    Write-Output "Running as Administrator. Executing stop-service..."
    & $scriptPath
    Start-Sleep -Seconds 2
    Write-Output "Now starting service..."
    $nssm = Join-Path (Split-Path $PSScriptRoot) 'tools\nssm.exe'
    & $nssm start AdoteAIService
    Start-Sleep -Seconds 3
    Write-Output "Service status:"
    & $nssm status AdoteAIService
} else {
    Write-Output "Requesting Administrator privileges for service restart..."
    Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs -Wait
}
