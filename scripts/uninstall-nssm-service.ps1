param(
    [string]$ServiceName = 'AdoteAIService'
)

function Assert-Admin {
    $current = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    if (-not $current.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
        Write-Error "This script requires Administrator privileges. Re-run PowerShell as Administrator and try again."
        exit 1
    }
}

Assert-Admin

$nssmPath = "$PSScriptRoot\nssm.exe"
if (-not (Test-Path $nssmPath)) {
    Write-Error "nssm.exe not found in the scripts folder. If installed elsewhere, update the script or remove the service manually via 'nssm.exe remove $ServiceName confirm' or sc.exe."
    exit 1
}

Write-Output "Stopping service $ServiceName (if running)..."
& $nssmPath stop $ServiceName 2>$null

Write-Output "Removing service $ServiceName..."
& $nssmPath remove $ServiceName confirm

Write-Output "Service removed. You may delete $nssmPath if you no longer need it."
