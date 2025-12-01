try {
    Write-Output "Running elevated repair script..."
    $projectRoot = (Resolve-Path "$PSScriptRoot\..").Path
    $jar = (Resolve-Path "$projectRoot\target\ai-0.0.1-SNAPSHOT.jar" -ErrorAction SilentlyContinue)
    if (-not $jar) {
        Write-Error "JAR not found at $projectRoot\target\ai-0.0.1-SNAPSHOT.jar. Please build the project first."
        exit 2
    }
    $jar = $jar.Path
    $nssm = Join-Path $projectRoot 'tools\nssm.exe'
    if (-not (Test-Path $nssm)) { Write-Error "nssm.exe not found at $nssm"; exit 3 }

    Write-Output "Setting NSSM parameters for AdoteAIService..."
    
    # Update Java executable to use Java 21
    $javaExe = 'C:\Users\Artur\Desktop\OpenJDK-21\bin\java.exe'
    if (-not (Test-Path $javaExe)) {
        Write-Error "Java 21 not found at $javaExe"
        exit 4
    }
    Write-Output "Setting Java executable to: $javaExe"
    & $nssm set AdoteAIService Application $javaExe
    
    & $nssm set AdoteAIService AppParameters ("-jar `"$jar`"")
    & $nssm set AdoteAIService AppDirectory $projectRoot

    $envString = "SPRING_DATASOURCE_URL=jdbc:postgresql://ep-sweet-boat-ad61ycpi-pooler.c-2.us-east-1.aws.neon.tech:5432/neondb`r`nSPRING_DATASOURCE_USERNAME=neondb_owner`r`nSPRING_DATASOURCE_PASSWORD=npg_Q2uqVBXNH3xp"
    & $nssm set AdoteAIService AppEnvironmentExtra $envString

    $logDir = Join-Path $projectRoot 'logs'
    if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
    & $nssm set AdoteAIService AppStdout (Join-Path $logDir 'service.out.log')
    & $nssm set AdoteAIService AppStderr (Join-Path $logDir 'service.err.log')
    & $nssm set AdoteAIService AppRotateFiles 1

    & $nssm set AdoteAIService Start SERVICE_AUTO_START

    Write-Output "Starting AdoteAIService..."
    & $nssm start AdoteAIService

    Start-Sleep -Seconds 2
    Write-Output "NSSM status:"
    & $nssm status AdoteAIService
    Write-Output "Windows service status:"
    Get-Service -Name AdoteAIService | Format-List Status,DisplayName,Name

    Write-Output "Tailing logs (if present):"
    if (Test-Path (Join-Path $logDir 'service.out.log')) { Get-Content (Join-Path $logDir 'service.out.log') -Tail 200 } else { Write-Output 'No stdout log present yet.' }
    if (Test-Path (Join-Path $logDir 'service.err.log')) { Get-Content (Join-Path $logDir 'service.err.log') -Tail 200 } else { Write-Output 'No stderr log present yet.' }

    Write-Output "Elevated repair script completed."
} catch {
    Write-Error "Elevated repair script failed: $($_.Exception.Message)"
    exit 1
}
