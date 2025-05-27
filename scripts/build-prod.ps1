# build-prod.ps1
param(
    [string]$prodTag = "latest",
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

$imageName = "${env:PROJECT_NAME}-prod"
$dockerHubUser = "${env:DOCKERHUB_USER:-yourdockerhub}"
$dockerHubRepo = "${env:DOCKERHUB_REPO:-yourrepo}"

Write-Host "📦 Build de l'image prod Docker..."
docker build -t "$dockerHubUser/$dockerHubRepo:$prodTag" .

Write-Host "🚀 Push de l'image vers Docker Hub..."
docker push "$dockerHubUser/$dockerHubRepo:$prodTag"
