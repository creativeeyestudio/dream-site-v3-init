param(
    [string]$envFile = ".env"
)

Write-Host "🔄 Lecture des variables depuis $envFile"
Get-Content $envFile | ForEach-Object {
    if ($_ -match "^\s*([^#=]+)=(.+)$") {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        Set-Item -Path "Env:$name" -Value $value
    }
}

$imageName = "${env:PROJECT_NAME}-dev"
$tag = "latest"
$registry = "${env:GITHUB_REGISTRY:-ghcr.io/your-org}"

Write-Host "📦 Build de l'image dev Docker..."
docker build -t "$registry/$imageName:$tag" .

Write-Host "🚀 Push de l'image vers le registry GitHub..."
docker push "$registry/$imageName:$tag"
