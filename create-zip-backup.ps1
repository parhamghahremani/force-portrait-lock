$date = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$version = '2.0.1'
$zipName = 'force-portrait-lock-v' + $version + '-' + $date + '.zip'
$zipPath = 'backups\releases\' + $zipName
$manifestPath = 'backups\BACKUP_MANIFEST.md'

# Create release ZIP: source + docs only (exclude backups, .git, versions)
Compress-Archive -Path 'force-portrait-lock.user.js', 'README.md', 'CHANGELOG.md', 'CLAUDE.md', 'PROJECT_STATUS.md', 'docs', '.gitignore' -DestinationPath $zipPath -Force

# Calculate SHA256
$zipHash = (Get-FileHash -Algorithm SHA256 $zipPath).Hash
$zipSizeKB = [math]::Round((Get-Item $zipPath).Length / 1KB, 2)

# Create manifest entry
$manifestEntry = "## $date`n`n### Release Archive`n- **File**: $zipName`n- **SHA256**: $zipHash`n- **Size**: $zipSizeKB KB`n- **Version**: $version`n"

# Create/update manifest
if (Test-Path $manifestPath) {
    $existing = Get-Content $manifestPath -Raw
    Set-Content $manifestPath -Value ($manifestEntry + $existing)
} else {
    $header = "# Backup Manifest -- force-portrait-lock`n`n"
    Set-Content $manifestPath -Value ($header + $manifestEntry)
}

Write-Host "Release ZIP: $zipPath"
Write-Host "SHA256: $zipHash"