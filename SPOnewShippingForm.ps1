param
(   
    [Parameter(Mandatory=$true)][string]$ListName
)

$WebPartXMLview = "<?xml version='1.0' encoding='utf-8'?>
<WebPart xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns='http://schemas.microsoft.com/WebPart/v2'>
  <Title>Content Editor</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <ZoneID>Main</ZoneID>
  <PartOrder>0</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter />
  <Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>
  <TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>
  <ContentLink xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor'>/sites/forms/Shipping/SiteAssets/ShippingForms/DocumentLibraryAdd.js</ContentLink>
  <Content xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />
  <PartStorage xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />
</WebPart>"

$WebPartXMLedit = "<?xml version='1.0' encoding='utf-8'?>
<WebPart xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns='http://schemas.microsoft.com/WebPart/v2'>
  <Title>Content Editor</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <ZoneID>Main</ZoneID>
  <PartOrder>0</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter />
  <Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>
  <TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>
  <ContentLink xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor'>/sites/forms/Shipping/SiteAssets/ShippingForms/LoadOnDemand.js</ContentLink>
  <Content xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />
  <PartStorage xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />
</WebPart>"

$Url = "https://potashcorp.sharepoint.com/sites/forms/Shipping"
$ListTemplateInternalName = "ShippingForms.stp"

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

$EditFormURL = "/sites/forms/shipping/" + $ListName + "/forms/EditForm.aspx"
$AllItemsURL = "/sites/forms/Shipping/" + $ListName + "/Forms/AllItems.aspx"
$BillOfLadingURL = "/sites/forms/Shipping/" + $ListName + "/Forms/Bill%20of%20Lading.aspx"
$ShippingAdviceURL = "/sites/forms/Shipping/" + $ListName + "/Forms/Shipping%20Advice.aspx"

Add-PnPWebPartToWebPartPage -ServerRelativePageUrl $EditFormURL -XML $WebPartXMLedit -ZoneId "Main" -ZoneIndex 0
Add-PnPWebPartToWebPartPage -ServerRelativePageUrl $AllItemsURL -XML $WebPartXMLview -ZoneId "Main" -ZoneIndex 0

Add-PnPWebPartToWebPartPage -ServerRelativePageUrl $BillOfLadingURL -XML $WebPartXMLview -ZoneId "Main" -ZoneIndex 0
Add-PnPWebPartToWebPartPage -ServerRelativePageUrl $ShippingAdviceURL -XML $WebPartXMLview -ZoneId "Main" -ZoneIndex 0

Disconnect-PnPOnline