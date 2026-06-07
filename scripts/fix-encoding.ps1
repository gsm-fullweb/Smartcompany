# Fix encoding: replace Latin-1 mojibake with correct UTF-8 accented characters
$file = Join-Path $PSScriptRoot "..\src\pages\admin\Dashboard.tsx"
$file = Resolve-Path $file

# Read as UTF-8 (file is already stored as UTF-8 but content has mojibake strings)
$text = [System.IO.File]::ReadAllText($file.Path, [System.Text.Encoding]::UTF8)

# Each pair: [broken string] -> [correct UTF-8]
$fixes = @(
  # Single-byte mojibake (UTF-8 2-byte sequences read as Latin-1)
  @('Ã£', 'ã'), @('Ã ', 'à'), @('Ã¡', 'á'), @('Ã¢', 'â'), @('Ã£', 'ã'), @('Ã¤', 'ä'),
  @('Ã©', 'é'), @('Ã¨', 'è'), @('Ãª', 'ê'), @('Ã­', 'í'), @('Ã¬', 'ì'), @('Ã®', 'î'),
  @('Ã³', 'ó'), @('Ã²', 'ò'), @('Ã´', 'ô'), @('Ãµ', 'õ'), @('Ãº', 'ú'), @('Ã¹', 'ù'),
  @('Ã»', 'û'), @('Ã§', 'ç'), @('Ã±', 'ñ'), @('Ã½', 'ý'), @('Ã¿', 'ÿ'),
  # Uppercase
  @('Ã€', 'À'), @('Ã', 'Á'), @('Ã‚', 'Â'), @('Ãƒ', 'Ã'), @('Ã„', 'Ä'),
  @('Ã‡', 'Ç'), @('Ãˆ', 'È'), @('Ã‰', 'É'), @('ÃŠ', 'Ê'), @('Ã‹', 'Ë'),
  @('ÃŒ', 'Ì'), @('Ã', 'Í'), @('ÃŽ', 'Î'), @('Ã"', 'Ó'), @('Ã"', 'Ô'),
  @('Ã•', 'Õ'), @('Ã–', 'Ö'), @('Ã™', 'Ù'), @('Ãš', 'Ú'), @('Ã›', 'Û'),
  @('Ãœ', 'Ü'), @('Ã', 'Ý'), @('ÃŸ', 'ß'),
  # Special: Ã† etc
  @('Ã†', 'Æ'), @('Ã—', '×'), @('Ã˜', 'Ø'), @('Ãž', 'Þ'),
  # Remaining Ã fallback (bare Ã before space or EOL) - leave as-is
  # Fix INCÃŠNDIO → INCÊNDIO
  @('INCÃŠNDIO', 'INCÊNDIO')
)

foreach ($pair in $fixes) {
  $text = $text.Replace($pair[0], $pair[1])
}

# Write back as UTF-8 without BOM
$enc = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($file.Path, $text, $enc)
Write-Host "Done. File written: $($file.Path)"
