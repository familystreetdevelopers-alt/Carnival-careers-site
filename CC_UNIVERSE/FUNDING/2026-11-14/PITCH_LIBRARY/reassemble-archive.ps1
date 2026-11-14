# Reassemble the exact Carnival Careers funding archive from its eight parts.
# Works in Windows PowerShell 5.1 and PowerShell 7+.
$ErrorActionPreference = 'Stop'
$dir = $PSScriptRoot
$names = 1..8 | ForEach-Object { 'Carnival_Careers_15_Pitch_PDFs.zip.part' + $_.ToString('00') }
$output = Join-Path $dir 'Carnival_Careers_15_Pitch_PDFs.zip'
$destination = [System.IO.File]::Open($output,[System.IO.FileMode]::Create)
try {
    foreach ($name in $names) {
        $src = [System.IO.File]::OpenRead((Join-Path $dir $name))
        try { $src.CopyTo($destination) } finally { $src.Dispose() }
    }
} finally {
    $destination.Dispose()
}
$expected = '6b19eca8afc5d1b2350944e3418765b8ccbdd6cd1f790d9093c7497f26b907b9'
$actual = (Get-FileHash -Path $output -Algorithm SHA256).Hash.ToLowerInvariant()
if ($actual -ne $expected) { throw ('ZIP checksum mismatch: ' + $actual) }
Write-Output ('Verified archive: ' + $output)
