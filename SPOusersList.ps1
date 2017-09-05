[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")

Function GetSPOCredentials($UserName, $Password)
{
   return New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName,$Password)
}

$UserName = "hartley.schroeder@potashcorp.com"
#$UserName = Read-Host -Prompt "Enter the user"
$Password = Read-Host -Prompt "Enter the password" -AsSecureString

$Url = "https://potashcorp.sharepoint.com/sites/itdev/solvera"

$context = New-Object Microsoft.SharePoint.Client.ClientContext($Url)
$context.Credentials = GetSPOCredentials $UserName $Password

$site = $context.Site
$context.Load($site)
$context.Load($site.RootWeb)
$context.Load($site.RootWeb.SiteGroups)

$context.ExecuteQuery()

$siteGroups = $site.RootWeb.SiteGroups
$siteRootWeb = $site.RootWeb.Url

$out = ""

foreach ($group in $siteGroups)
{
    if($group -ne $null)
    {
        $out = $out + "<br><b>" + $group.Title + "</b><br>"
    }
    $context.Load($group.Users)
    $context.ExecuteQuery()
    foreach ($user in $group.Users)
    {
        if($user.Email.Length -ne 0)
        {
            $out = $out + " " + $user.Email + "<br>"
        }
        
    }
}

$spoEMailProperties=New-Object Microsoft.SharePoint.Client.Utilities.EmailProperties        
$spoEMailProperties.To=[String[]]("hartley.schroeder@potashcorp.com")
$spoEMailProperties.From="hartley.schroeder@potashcorp.com"
$spoEMailProperties.Body=$out
$spoEMailProperties.Subject="List of user permissions from: " + $siteRootWeb
[Microsoft.SharePoint.Client.Utilities.Utility]::SendEmail($context, $spoEMailProperties)        
$context.ExecuteQuery() 

$context.Dispose()