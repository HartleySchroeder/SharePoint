<<<<<<< HEAD
﻿#$credential = Get-Credential
#Import-Module MsOnline
#Connect-MsolService -Credential $credential

#Import-Module Microsoft.Online.SharePoint.PowerShell -DisableNameChecking

#Connect-SPOService -Url https://potashcorp-admin.sharepoint.com -credential $credential

#$Context = New-Object Microsoft.SharePoint.Client.ClientContext("https://potashcorp.sharepoint.com/sites/itdev")
#$Context.Credentials = $credential
#$Context


#Specify tenant admin and site URL
$User = "hartley.schroeder@potashcorp.com"
$SiteURL = "https://potashcorp.sharepoint.com/sites/itdev/solvera"
$Folder = "C:\test"
$DocLibName = "Site Assets"

#Add references to SharePoint client assemblies and authenticate to Office 365 site - required for CSOM (needs/needed to be downloaded)
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\15\ISAPI\Microsoft.SharePoint.Client.dll"
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\15\ISAPI\Microsoft.SharePoint.Client.Runtime.dll"
$Password = Read-Host -Prompt "Please enter your password" -AsSecureString

#Bind to site collection
$Context = New-Object Microsoft.SharePoint.Client.ClientContext($SiteURL)
$Creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($User,$Password)
$Context.Credentials = $Creds


$NewLogoURL = $Context.Web.SiteLogoUrl = "/sites/itdev/solvera/SiteAssets/"


#Retrieve list
$List = $Context.Web.Lists.GetByTitle($DocLibName)
$Context.Load($List)
$Context.ExecuteQuery()

#Upload file
Foreach ($File in (dir $Folder -File))
{
    $FileStream = New-Object IO.FileStream($File.FullName,[System.IO.FileMode]::Open)
    $FileCreationInfo = New-Object Microsoft.SharePoint.Client.FileCreationInformation
    $FileCreationInfo.Overwrite = $true
    $FileCreationInfo.ContentStream = $FileStream
    $FileCreationInfo.URL = $File
    $Upload = $List.RootFolder.Files.Add($FileCreationInfo)
    $Context.Load($Upload)
    $Context.ExecuteQuery()
=======
﻿#$credential = Get-Credential
#Import-Module MsOnline
#Connect-MsolService -Credential $credential

#Import-Module Microsoft.Online.SharePoint.PowerShell -DisableNameChecking

#Connect-SPOService -Url https://potashcorp-admin.sharepoint.com -credential $credential

#$Context = New-Object Microsoft.SharePoint.Client.ClientContext("https://potashcorp.sharepoint.com/sites/itdev")
#$Context.Credentials = $credential
#$Context


#Specify tenant admin and site URL
$User = "hartley.schroeder@potashcorp.com"
$SiteURL = "https://potashcorp.sharepoint.com/sites/itdev/solvera"
$Folder = "C:\test"
$DocLibName = "Site Assets"

#Add references to SharePoint client assemblies and authenticate to Office 365 site - required for CSOM (needs/needed to be downloaded)
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\15\ISAPI\Microsoft.SharePoint.Client.dll"
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\15\ISAPI\Microsoft.SharePoint.Client.Runtime.dll"
$Password = Read-Host -Prompt "Please enter your password" -AsSecureString

#Bind to site collection
$Context = New-Object Microsoft.SharePoint.Client.ClientContext($SiteURL)
$Creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($User,$Password)
$Context.Credentials = $Creds


$NewLogoURL = $Context.Web.SiteLogoUrl = "/sites/itdev/solvera/SiteAssets/"


#Retrieve list
$List = $Context.Web.Lists.GetByTitle($DocLibName)
$Context.Load($List)
$Context.ExecuteQuery()

#Upload file
Foreach ($File in (dir $Folder -File))
{
    $FileStream = New-Object IO.FileStream($File.FullName,[System.IO.FileMode]::Open)
    $FileCreationInfo = New-Object Microsoft.SharePoint.Client.FileCreationInformation
    $FileCreationInfo.Overwrite = $true
    $FileCreationInfo.ContentStream = $FileStream
    $FileCreationInfo.URL = $File
    $Upload = $List.RootFolder.Files.Add($FileCreationInfo)
    $Context.Load($Upload)
    $Context.ExecuteQuery()
>>>>>>> 333a001dc3dbd783355614e2d4a3bde2f3155114
}