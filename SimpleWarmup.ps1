Add-PsSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue 

$apps = get-spwebapplication -includecentraladministration
foreach ($app in $apps) {
$sites = get-spsite -webapplication $app.url -Limit ALL
foreach ($site in $sites) {
    write-host $site.Url
    $r = Invoke-WebRequest $site.Url -UseDefaultCredentials -UseBasicParsing
    $r.StatusCode
  }
}