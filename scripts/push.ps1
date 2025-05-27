param(
    [string]$imageName,
    [string]$tag = "latest"
)

if (-not $imageName) {
    Write-Error "Usage: .\push.ps1 -imageName <image> [-tag <tag>]"
    exit 1
}

Write-Host "🚀 Push de l'image $imageName:$tag"
docker push "$imageName:$tag"