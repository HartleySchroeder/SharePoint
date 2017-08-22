<<<<<<< HEAD
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")

$UserName = "hartley.schroeder@potashcorp.com"
#$UserName = Read-Host -Prompt "Enter the user"
$Password = Read-Host -Prompt "Enter the password" -AsSecureString

$Url = "https://potashcorp.sharepoint.com/sites/itdev/solvera"

$context = New-Object Microsoft.SharePoint.Client.ClientContext($Url)
$context.Credentials = Get-SPOCredentials $UserName $Password

$web = $context.Web
$context.Load($web)
$context.ExecuteQuery()

$context.Load($web.Webs)
$context.ExecuteQuery()
if ($web.Webs.Count -gt 0){
    RecursiveWebs $web
}
Function Get-SPOCredentials($UserName, $Password)
{
   return New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName,$Password)
}
Function SetLogo($web, $SiteLogoUrl)
{
    $web.SiteLogoUrl = $SiteLogoUrl
    $web.Update()
    $context.ExecuteQuery()
}
Function RecursiveWebs($web){
    foreach($w in $web.Webs)
    {
        SetLogo $w "/SiteAssets/potashcorp-p-col_grid.png"
        #SetLogo $w "/sites/itdev/solvera/SiteAssets/solvera-logo.png"
        write-host $w.SiteLogoUrl -ForegroundColor Green
        $context.Load($w.Webs)
        $context.ExecuteQuery()
        if ($w.Webs.Count -gt 0){
            RecursiveWebs $w
        }
    }
}

=======
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")

$UserName = "hartley.schroeder@potashcorp.com"
#$UserName = Read-Host -Prompt "Enter the user"
$Password = Read-Host -Prompt "Enter the password" -AsSecureString

$Url = "https://potashcorp.sharepoint.com/sites/itdev/solvera"

$context = New-Object Microsoft.SharePoint.Client.ClientContext($Url)
$context.Credentials = Get-SPOCredentials $UserName $Password

$web = $context.Web
$context.Load($web)
$context.ExecuteQuery()

$context.Load($web.Webs)
$context.ExecuteQuery()
if ($web.Webs.Count -gt 0){
    RecursiveWebs $web
}
Function Get-SPOCredentials($UserName, $Password)
{
   return New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName,$Password)
}
Function SetLogo($web, $SiteLogoUrl)
{
    $web.SiteLogoUrl = $SiteLogoUrl
    $web.Update()
    $context.ExecuteQuery()
}
Function RecursiveWebs($web){
    foreach($w in $web.Webs)
    {
        SetLogo $w "/SiteAssets/potashcorp-p-col_grid.png"
        #SetLogo $w "/sites/itdev/solvera/SiteAssets/solvera-logo.png"
        write-host $w.SiteLogoUrl -ForegroundColor Green
        $context.Load($w.Webs)
        $context.ExecuteQuery()
        if ($w.Webs.Count -gt 0){
            RecursiveWebs $w
        }
    }
}

>>>>>>> 333a001dc3dbd783355614e2d4a3bde2f3155114
$context.Dispose()