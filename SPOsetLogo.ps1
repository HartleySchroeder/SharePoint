param
(   
    [Parameter(Mandatory=$true)][string]$URL,
    [Parameter(Mandatory=$true)][string]$Username,
    [Parameter(Mandatory=$true)][string]$FileURL = "/SiteAssets/potashcorp-p-col_grid.png",
    [SecureString]$Password = $( Read-Host "Input password, please" -AsSecureString  )
)

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
        SetLogo $w $FileURL
        write-host $w.URL -ForegroundColor Green
        $context.Load($w.Webs)
        $context.ExecuteQuery()
        if ($w.Webs.Count -gt 0){
            RecursiveWebs $w
        }
    }
}

#load the context with the provided credentials
$context = New-Object Microsoft.SharePoint.Client.ClientContext($URL)
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