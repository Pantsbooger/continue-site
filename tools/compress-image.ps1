<#
.SYNOPSIS
  Resize and recompress a JPEG before it goes into assets/images/.

.DESCRIPTION
  Dev-only helper, not part of the deployed site - nothing in index.html/
  articles/*.html ever references anything under tools/. Uses .NET's
  built-in System.Drawing, so it needs no install (no ImageMagick, no
  npm packages).

  Written 14 Sept 2026 after the SNL UK header image (431KB at 1920x1080,
  a straight download from a press kit with no compression pass) caused
  real "doesn't load immediately" complaints - every other header image
  on the site sits at 68-214KB. Re-run this on every new photo before
  committing it, not just the ones that look obviously huge.

.PARAMETER Path
  Source image to compress. Required.

.PARAMETER OutPath
  Where to write the result. Defaults to overwriting Path in place.

.PARAMETER Width
  Target width in pixels, height scales to match. Default 1400 - comfortably
  more than any hero/card slot on the site displays, even at 2x for retina.

.PARAMETER Quality
  JPEG quality, 1-100. Default 78. This site's target range is roughly
  70-220KB per image; nudge quality down a little for busy/textured photos,
  up a little for simple/flat ones, and always look at the result before
  committing to it, this is a starting point, not a fixed setting.

.EXAMPLE
  .\tools\compress-image.ps1 -Path assets\images\some-new-header.jpg

.EXAMPLE
  .\tools\compress-image.ps1 -Path raw\photo.jpg -OutPath assets\images\photo.jpg -Width 1200 -Quality 75
#>
param(
  [Parameter(Mandatory = $true)]
  [string]$Path,

  [string]$OutPath,

  [int]$Width = 1400,

  [int]$Quality = 78
)

if (-not (Test-Path $Path)) {
  Write-Error "No such file: $Path"
  exit 1
}
if (-not $OutPath) { $OutPath = $Path }

Add-Type -AssemblyName System.Drawing

$resolvedPath = (Resolve-Path $Path).Path
$origSize = (Get-Item $resolvedPath).Length
$img = [System.Drawing.Image]::FromFile($resolvedPath)

$targetWidth = [Math]::Min($Width, $img.Width)
$ratio = $targetWidth / $img.Width
$targetHeight = [int]($img.Height * $ratio)

$bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
$g.Dispose()
$img.Dispose()

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)

# Write to a temp file first - OutPath may be the same file we just read from,
# and Bitmap can't safely overwrite the file it's still backed by.
$tmpOut = "$OutPath.tmp"
$bmp.Save($tmpOut, $encoder, $encParams)
$bmp.Dispose()
Move-Item -Force $tmpOut $OutPath

$newSize = (Get-Item $OutPath).Length
$pct = [Math]::Round((1 - ($newSize / $origSize)) * 100, 1)
Write-Output "$Path`: $([Math]::Round($origSize/1KB))KB -> $([Math]::Round($newSize/1KB))KB ($pct% smaller), ${targetWidth}x${targetHeight}"
Write-Output "Check it still looks right before committing - re-run with a higher -Quality or -Width if it doesn't."
