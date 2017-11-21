#Connect-PnPOnline -Url https://potashcorp.sharepoint.com/sites/forms/shipping -Credentials (Get-Credential)


#New-PnPList -Title "Allan Shipping Forms" -Url "ALNforms" -Template "ShippingForms"
#Get-PnPProvisioningTemplate -Out Cory_Template.xml -PersistBrandingFiles -IncludeSiteGroups -IncludeAllTermGroups -IncludeSearchConfiguration
#Get-PnPProvisioningTemplate -Out Shipping_Template.xml
#Apply-PnPProvisioningTemplate -Path "C:\Dev\SharePoint\template.xml"

#Add-PnPWebPartToWebPartPage -ServerRelativePageUrl "/sites/forms/shipping/ALNforms/forms/EditForm.aspx" -Path "C:\Dev\SharePoint\ContentEditorEditForm.dwp" -ZoneId "Main" -ZoneIndex 0
#Add-PnPWebPartToWebPartPage -ServerRelativePageUrl "/sites/forms/Shipping/ALNforms/Forms/AllItems.aspx" -Path "C:\Dev\SharePoint\ContentEditorView.dwp" -ZoneId "Main" -ZoneIndex 0

#Add-PnPWebPartToWebPartPage -ServerRelativePageUrl "/sites/forms/Shipping/ALNforms/Forms/Bill%20of%20Lading.aspx" -Path "C:\Dev\SharePoint\ContentEditorView.dwp" -ZoneId "Main" -ZoneIndex 0
#Add-PnPWebPartToWebPartPage -ServerRelativePageUrl "/sites/forms/Shipping/ALNforms/Forms/Shipping%20Advice.aspx" -Path "C:\Dev\SharePoint\ContentEditorView.dwp" -ZoneId "Main" -ZoneIndex 0

#http://cmbdemo.canadacentral.cloudapp.azure.com/_vti_bin/ExcelRest.aspx/Shared%20Documents/2015-oct-mcfs.xlsx/model/Ranges('A17%7Cbt117')?$format=atom
#Register-SPWorkflowService -SPSite http://uat.collaboration.mbgov.ca -WorkflowHostUri https://mbpapp1059u.shared.mbgov.ca:12290 -AllowOAuthHttp

$Url = "https://potashcorp.sharepoint.com/sites/forms/Shipping"
$ListTemplateInternalName = "ShippingForms.stp"
$ListName = "ALNNewLib"

Connect-PnPOnline -Url $Url

$Context = Get-PnPContext
$RootWeb = $Context.Site.RootWeb
$Web = $Context.Web
$ListTemplates = $Context.Site.GetCustomListTemplates($RootWeb)
$Context.Load($RootWeb)
$Context.Load($Web)
$Context.Load($ListTemplates)
Execute-PnPQuery

$ListTemplate = $ListTemplates | where { $_.InternalName -eq $ListTemplateInternalName }

if ($ListTemplate -eq $null)
{
    Throw [System.Exception] "Template not found"
}

$ListCreation = New-Object Microsoft.SharePoint.Client.ListCreationInformation
$ListCreation.Title = $ListName
$ListCreation.ListTemplate = $ListTemplate
$ListCreation.TemplateFeatureId = $ListTemplate.FeatureId
$ListCreation.TemplateType = $ListTemplate.ListTemplateTypeKind

$Web.Lists.Add($ListCreation)
Execute-PnPQuery

Add-PnPWebPartToWebPartPage -ServerRelativePageUrl "/sites/forms/shipping/ALNNewLib/forms/EditForm.aspx" -Path "C:\Dev\SharePoint\ContentEditorEditForm.dwp" -ZoneId "Main" -ZoneIndex 0
Add-PnPWebPartToWebPartPage -ServerRelativePageUrl "/sites/forms/Shipping/ALNNewLib/Forms/AllItems.aspx" -Path "C:\Dev\SharePoint\ContentEditorView.dwp" -ZoneId "Main" -ZoneIndex 0

Add-PnPWebPartToWebPartPage -ServerRelativePageUrl "/sites/forms/Shipping/ALNNewLib/Forms/Bill%20of%20Lading.aspx" -Path "C:\Dev\SharePoint\ContentEditorView.dwp" -ZoneId "Main" -ZoneIndex 0
Add-PnPWebPartToWebPartPage -ServerRelativePageUrl "/sites/forms/Shipping/ALNNewLib/Forms/Shipping%20Advice.aspx" -Path "C:\Dev\SharePoint\ContentEditorView.dwp" -ZoneId "Main" -ZoneIndex 0

Disconnect-PnPOnline