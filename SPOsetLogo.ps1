[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")

Function Get-SPOCredentials($UserName, $Password)
{
   return New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName,$Password)
}

#update the logo of the site
Function SetLogo($web, $SiteLogoUrl)
{
    $web.SiteLogoUrl = $SiteLogoUrl
    $web.Update()
    $context.ExecuteQuery()
}
#recursively call this function to continue through all webs
Function RecursiveWebs($web){
    foreach($w in $web.Webs)
    {
        SetLogo $w "/SiteAssets/potashcorp-p-col_grid.png"
        write-host $w.SiteLogoUrl -ForegroundColor Green
        $context.Load($w.Webs)
        $context.ExecuteQuery()
        if ($w.Webs.Count -gt 0){
            RecursiveWebs $w
        }
    }
}

$UserName = "hartley.schroeder@potashcorp.com"
#$UserName = Read-Host -Prompt "Enter the user"
$Password = Read-Host -Prompt "Enter the password" -AsSecureString
#$Url = Read-Host -Prompt "Enter the URL"
$Url = "https://potashcorp.sharepoint.com/sites/itdev/solvera"

#load the context with the provided credentials
$context = New-Object Microsoft.SharePoint.Client.ClientContext($Url)
$context.Credentials = Get-SPOCredentials $UserName $Password

$web = $context.Web
$context.Load($web)
$context.Load($web.Webs)
$context.ExecuteQuery()

#loop through all subsites
if ($web.Webs.Count -gt 0){
    RecursiveWebs $web
}
#cleanup
$context.Dispose()