# PowerShell script to embed flowchart.js and script.js into HTML files

$files = @(
    @{html = "loan.html"; flowchart = "loan-flowchart.js"; script = "loan-script.js" },
    @{html = "ubank.html"; flowchart = "ubank-flowchart.js"; script = "ubank-script.js" },
    @{html = "outbound.html"; flowchart = "outbound-flowchart.js"; script = "outbound-script.js" },
    @{html = "card.html"; flowchart = "card-flowchart.js"; script = "card-script.js" }
)

foreach ($file in $files) {
    Write-Host "Processing $($file.html)..." -ForegroundColor Green
    
    # Read files with UTF8 encoding
    $htmlContent = [System.IO.File]::ReadAllText($file.html, [System.Text.Encoding]::UTF8)
    $flowchartJS = [System.IO.File]::ReadAllText($file.flowchart, [System.Text.Encoding]::UTF8)
    $scriptJS = [System.IO.File]::ReadAllText($file.script, [System.Text.Encoding]::UTF8)
    
    # Create embedded script block
    $embeddedScripts = @"
<script>
// Embedded flowchart data
$flowchartJS
</script>
<script>
// Embedded main script
$scriptJS
</script>
"@
    
    # Replace external script tags with embedded scripts
    $pattern = [regex]::Escape("<script src=`"$($file.flowchart)`"></script>") + "\s*" + [regex]::Escape("<script src=`"$($file.script)`"></script>")
    $newHtml = $htmlContent -replace $pattern, $embeddedScripts
    
    # Save updated HTML with UTF8 encoding without BOM
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($file.html, $newHtml, $utf8NoBom)
    
    Write-Host "Completed $($file.html)" -ForegroundColor Cyan
}

Write-Host "`nAll files processed successfully!" -ForegroundColor Green
