param
(   
    [Parameter(Mandatory=$true)][string]$URL,
    [Parameter(Mandatory=$true)][String[]]$To,
    [Parameter(Mandatory=$true)][string]$Username,
    [SecureString]$Password = $( Read-Host "Input password, please" -AsSecureString  )
)

[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")

Function GetSPOCredentials($UserName, $Password)
{
   return New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName,$Password)
}

#load the context with the provided credentials
$context = New-Object Microsoft.SharePoint.Client.ClientContext($Url)
$context.Credentials = GetSPOCredentials $UserName $Password

$web = $context.Web
$context.Load($web)
$context.Load($web.SiteGroups)

$context.ExecuteQuery()

$emailBody = ""
#loop through all groups
foreach ($group in $web.SiteGroups)
{    
    write-host $group.Title -ForegroundColor Green
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
$spoEMailProperties.To = $To
#change the FROM to some generic email
$spoEMailProperties.From = "no-reply@sharepointonline.com"
$spoEMailProperties.Body = $emailBody
$spoEMailProperties.Subject = "List of user permissions from: " + $URL
[Microsoft.SharePoint.Client.Utilities.Utility]::SendEmail($context, $spoEMailProperties)
$context.ExecuteQuery()
#cleanup
$context.Dispose()