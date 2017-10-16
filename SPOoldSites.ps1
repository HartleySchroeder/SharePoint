param
(   
    [string]$URL,
    [string]$Username,
    [String[]]$To,
    [SecureString]$Password = $( Read-Host "Input password, please" -AsSecureString  )
)

[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Publishing")
$date = Get-Date
$emailBody90 = "<b>Sites 90 days old (today)</b><br>"
$emailBody365 = "<br><br><b>Sites 1 year old (today)</b><br>"
Function Get-SPOCredentials($UserName, $Password)
{
   return New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName,$Password)
}
#recursively call this function to continue through all webs
Function RecursiveWebs($web){
    foreach($w in $web.Webs)
    {
        if ($w.Created -eq $date.AddDays(-90)) {
            $script:emailBody90 = $emailBody90 + "<br>" + $w.Url + " Created: " + $w.Created + "<br>"
            write-host $w.Url $w.Created -ForegroundColor green
        }
        elseif ($w.Created -eq $date.AddDays(-365)) {
            $script:emailBody365 = $emailBody365 + "<br>" + $w.Url + " Created: " + $w.Created + "<br>"
            write-host $w.Url $w.Created -ForegroundColor green
        }

        $context.Load($w.Webs)
        $context.ExecuteQuery()
        if ($w.Webs.Count -gt 0){
            RecursiveWebs $w
        }
    }
}

#load the contexts with the provided credentials
$context = New-Object Microsoft.SharePoint.Client.ClientContext($URL)
$context.Credentials = Get-SPOCredentials $UserName $Password

$web = $context.Web
$context.Load($web)
$context.Load($web.Webs)

$context.ExecuteQuery()

if ($web.Webs.Count -gt 0){
    RecursiveWebs $web
}

#send the email
$spoEMailProperties = New-Object Microsoft.SharePoint.Client.Utilities.EmailProperties
$spoEMailProperties.To = $To
#change the FROM to some generic email
$spoEMailProperties.From = "no-reply@sharepointonline.com"
$spoEMailProperties.Body = $emailBody90 + $emailBody365
$spoEMailProperties.Subject = "Old Sites: " + $URL
[Microsoft.SharePoint.Client.Utilities.Utility]::SendEmail($context, $spoEMailProperties)
$context.ExecuteQuery()
#cleanup
$context.Dispose()