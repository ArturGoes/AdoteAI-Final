# Stop the AdoteAIService with administrator privileges
try {
    Write-Output "Stopping AdoteAIService..."
    $nssm = Join-Path (Split-Path $PSScriptRoot) 'tools\nssm.exe'
    & $nssm stop AdoteAIService
    Start-Sleep -Seconds 3
    Write-Output "Service stopped. Status:"
    & $nssm status AdoteAIService
    Write-Output "Service stop completed."
} catch {
    Write-Error "Failed to stop service: $($_.Exception.Message)"
    exit 1
}
