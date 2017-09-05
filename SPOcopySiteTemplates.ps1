[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Publishing")

Function Get-SPOCredentials($UserName, $Password)
{
   return New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName,$Password)
}
Function DeleteWSP($File2Delete)
{
    $File2Delete.DeleteObject()
    $contextDest.ExecuteQuery()
}

$UserName = "hartley.schroeder@potashcorp.com"
#$UserName = Read-Host -Prompt "Enter the user"
$Password = Read-Host -Prompt "Enter the password" -AsSecureString

$Url = "https://potashcorp.sharepoint.com"
$UrlDest = "https://potashcorp.sharepoint.com/sites/itdev/"

$context = New-Object Microsoft.SharePoint.Client.ClientContext($Url)
$context.Credentials = Get-SPOCredentials $UserName $Password
$contextDest = New-Object Microsoft.SharePoint.Client.ClientContext($UrlDest)
$contextDest.Credentials = Get-SPOCredentials $UserName $Password

$solutionCatalog = 121

$web = $context.Site.RootWeb
$file = $web.GetFileByUrl("https://potashcorp.sharepoint.com/_catalogs/solutions/Department%20Portal.wsp")
$newFileBytes = $file.OpenBinaryStream()
$context.Load($web)
$context.Load($file)
$context.ExecuteQuery()

$siteDest = $contextDest.Site
$catalogDest = $siteDest.GetCatalog($solutionCatalog)
$contextDest.Load($siteDest)
$contextDest.Load($catalogDest)
$contextDest.ExecuteQuery()

$FileCreationInfo = New-Object Microsoft.SharePoint.Client.FileCreationInformation
$FileCreationInfo.Overwrite = $true
$FileCreationInfo.ContentStream = $newFileBytes.Value
$FileCreationInfo.URL = $file.Name
$FileUpload = $catalogDest.RootFolder.Files.Add($FileCreationInfo)

$contextDest.load($FileUpload)
$contextDest.ExecuteQuery()

$spoDesignPackageInfo = New-Object Microsoft.SharePoint.Client.Publishing.DesignPackageInfo
#$spoDesignPackageInfo.PackageGuid = [GUID]::Empty
$spoDesignPackageInfo.PackageGuid = "6EB6F606-8985-4A99-B49C-C007F91A9F90" #explicitly specify this so we know the ID when removing
$spoDesignPackageInfo.MajorVersion = 1
#$spoDesignPackageInfo.MinorVersion = 1
$spoDesignPackageInfo.PackageName = "Department Portal"
$sSolutionRelativePath = $siteDest.ServerRelativeUrl + "/_catalogs/solutions/" + $file.Name
$sSolutionRelativePath
Write-Host "----------------------------------------------------------------------------"  -foregroundcolor Green 
Write-Host "Activating the Sandbox Solution in the Solution Gallery!!" -foregroundcolor Green 
Write-Host "----------------------------------------------------------------------------"  -foregroundcolor Green 
$spoDesignPackage = [Microsoft.SharePoint.Client.Publishing.DesignPackage] 
$spoDesignPackage::UnInstall($contextDest,$contextDest.Site,$spoDesignPackageInfo)
$spoDesignPackage::Install($contextDest,$contextDest.Site,$spoDesignPackageInfo,$sSolutionRelativePath)
$contextDest.ExecuteQuery()

DeleteWSP $FileUpload

$context.Dispose()
$contextDest.Dispose()