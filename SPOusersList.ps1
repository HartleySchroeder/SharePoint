param
(   
    [string]$URL = "https://potashcorp.sharepoint.com/sites/itdev/solvera",
    [Parameter(Mandatory=$true)][string]$Username,
    [SecureString]$Password = $( Read-Host "Input password, please" -AsSecureString  )
)

[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")

Function GetSPOCredentials($UserName, $Password)
{
   return New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName,$Password)
}

#$UserName = "hartley.schroeder@potashcorp.com"
#$UserName = Read-Host -Prompt "Enter the user"
#$Password = Read-Host -Prompt "Enter the password" -AsSecureString
#$Url = Read-Host -Prompt "Enter the URL"
#$Url = "https://potashcorp.sharepoint.com/sites/itdev/solvera"

#load the context with the provided credentials
$context = New-Object Microsoft.SharePoint.Client.ClientContext($Url)
$context.Credentials = GetSPOCredentials $UserName $Password

$site = $context.Site
$context.Load($site)
$context.Load($site.RootWeb)
$context.Load($site.RootWeb.SiteGroups)

$context.ExecuteQuery()

$siteGroups = $site.RootWeb.SiteGroups
$siteRootWeb = $site.RootWeb.Url

$emailBody = ""
#loop through all groups
foreach ($group in $siteGroups)
{
    if($group -ne $null)
    {
        $emailBody = $emailBody + "<br><b>" + $group.Title + "</b><br>"
    }
    $context.Load($group.Users)
    $context.ExecuteQuery()
    #loop through all users
    foreach ($user in $group.Users)
    {
        if($user.Email.Length -ne 0)
        {
            $emailBody = $emailBody + " " + $user.Email + "<br>"
        }
        
    }
}
#send the email
$spoEMailProperties = New-Object Microsoft.SharePoint.Client.Utilities.EmailProperties
#$spoEMailProperties.To = Read-Host -Prompt "Enter the TO email"
$spoEMailProperties.To = [String[]]("hartley.schroeder@potashcorp.com")
#change the FROM to some generic email
$spoEMailProperties.From = "hartley.schroeder@potashcorp.com"
$spoEMailProperties.Body = $emailBody
$spoEMailProperties.Subject = "List of user permissions from: " + $siteRootWeb
[Microsoft.SharePoint.Client.Utilities.Utility]::SendEmail($context, $spoEMailProperties)        
$context.ExecuteQuery() 
#cleanup
$context.Dispose()