param(
    [string]$ServiceName = 'AdoteAIService',
    [string]$JarPath = "$(Resolve-Path ..\target\ai-0.0.1-SNAPSHOT.jar -ErrorAction SilentlyContinue)",
    [string]$DBUrl = 'jdbc:postgresql://ep-sweet-boat-ad61ycpi-pooler.c-2.us-east-1.aws.neon.tech:5432/neondb',
    [string]$DBUser = 'neondb_owner',
    [string]$DBPassword = 'npg_Q2uqVBXNH3xp'
)

function Assert-Admin {
    $current = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    if (-not $current.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
        Write-Error "This script requires Administrator privileges. Re-run PowerShell as Administrator and try again."
        exit 1
    }
}

Assert-Admin

if (-not $JarPath) {
    Write-Output "JAR not found at the default path. Attempting to build the project (this may take a while)..."
    $mvnCmd = "$PSScriptRoot\..\mvnw.cmd"
    if (Test-Path $mvnCmd) {
        cmd /c "$mvnCmd -DskipTests=true -B package"
    } else {
        Write-Error "Maven wrapper not found. Please build the project and ensure the JAR exists at ..\target\ai-0.0.1-SNAPSHOT.jar"
        exit 1
    }
    $JarPath = (Resolve-Path ..\target\ai-0.0.1-SNAPSHOT.jar -ErrorAction SilentlyContinue)
}

if (-not $JarPath) {
    Write-Error "JAR file still not found. Build failed or jar missing. Please run the build and re-run this script."
    exit 1
}

$JarPath = (Resolve-Path $JarPath).Path
Write-Output "Using JAR: $JarPath"

# Download NSSM
$tmpZip = "$env:TEMP\nssm.zip"
$tmpDir = "$env:TEMP\nssm_temp"
if (-not (Test-Path $tmpDir)) { New-Item -ItemType Directory -Path $tmpDir | Out-Null }
Invoke-WebRequest -Uri 'https://nssm.cc/release/nssm-2.24.zip' -OutFile $tmpZip -UseBasicParsing
Expand-Archive -Path $tmpZip -DestinationPath $tmpDir -Force

$nssmExe = Get-ChildItem $tmpDir -Recurse -Filter nssm.exe | Where-Object { $_.FullName -like '*win64*' } | Select-Object -First 1
if (-not $nssmExe) { $nssmExe = Get-ChildItem $tmpDir -Recurse -Filter nssm.exe | Select-Object -First 1 }
$nssmPath = "$PSScriptRoot\nssm.exe"
Copy-Item $nssmExe.FullName $nssmPath -Force

Write-Output "Installing service '$ServiceName' using NSSM at $nssmPath"

# Determine java path
$java = (Get-Command java -ErrorAction SilentlyContinue).Source
if (-not $java) { Write-Error "Java not found on PATH. Install JDK and ensure 'java' is on PATH."; exit 1 }

# Install service: executable = java, args = -jar <jar>
& $nssmPath install $ServiceName $java "-jar" "$JarPath"

# Set working directory
& $nssmPath set $ServiceName AppDirectory "$PSScriptRoot\.."

# Set environment variables for the service (newline-separated)
$envVars = "SPRING_DATASOURCE_URL=$DBUrl`r`nSPRING_DATASOURCE_USERNAME=$DBUser`r`nSPRING_DATASOURCE_PASSWORD=$DBPassword"
& $nssmPath set $ServiceName AppEnvironmentExtra $envVars

# Configure service to auto-start
& $nssmPath set $ServiceName Start SERVICE_AUTO_START

# Configure stdout/stderr logging for the service
$logDir = "$PSScriptRoot\..\logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
& $nssmPath set $ServiceName AppStdout "$logDir\service.out.log"
& $nssmPath set $ServiceName AppStderr "$logDir\service.err.log"
& $nssmPath set $ServiceName AppRotateFiles 1

Write-Output "Starting service $ServiceName..."
& $nssmPath start $ServiceName

Write-Output "Service installation attempted. Check Windows Services (services.msc) or run 'sc query $ServiceName' to confirm status." 
