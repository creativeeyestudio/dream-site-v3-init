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

$frontContainer = "${env:PROJECT_NAME}-front"

Write-Host "📁 Création du dossier front-local..."
if (-Not (Test-Path "front-local")) {
    New-Item -ItemType Directory front-local | Out-Null
}

Write-Host "📦 Copie du front depuis le conteneur..."
docker cp "$frontContainer:/app/src" "./front-local/src" | Out-Null
docker cp "$frontContainer:/app/pages" "./front-local/pages" | Out-Null
docker cp "$frontContainer:/app/public" "./front-local/public" | Out-Null

# Essaye de copier d'autres fichiers optionnels, ignore erreurs
Try {
    docker cp "$frontContainer:/app/next.config.js" "./front-local/next.config.js" | Out-Null
} Catch {}

Try {
    docker cp "$frontContainer:/app/package.json" "./front-local/package.json" | Out-Null
} Catch {}

Write-Host "🔁 Redémarrage du front avec montages locaux..."
docker-compose -f docker-compose.yml -f docker-compose.front-dev.yml up -d front
