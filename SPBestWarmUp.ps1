<#
.SYNOPSIS
	Warm up SharePoint IIS W3WP memory cache by loading pages from WebRequest

.DESCRIPTION
	Loads the full page so resources like CSS, JS, and images are included.
#>

Function WarmUp() {
    # Load plugin
    Add-PSSnapIn Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue

    # Warm up CMD parameter URLs
    $cmdurl | ForEach-Object {NavigateTo $_}

    # Warm up SharePoint web applications
    Write-Output "Opening Web Applications..."

    # Accessing the Alternate URls to warm up all "extended webs" (i.e. multiple IIS websites exists for one SharePoint webapp)
    $was = Get-SPWebApplication -IncludeCentralAdministration
    foreach ($wa in $was) {
 #       foreach ($alt in $wa.AlternateUrls) {
 #           $url = $alt.PublicUrl
 #           NavigateTo $url
 #           NavigateTo $url"_api/web"
 #           NavigateTo $url"_api/_trust" # for ADFS, first user login
 #           NavigateTo $url"_layouts/viewlsts.aspx"
 #           NavigateTo $url"_vti_bin/UserProfileService.asmx"
 #           NavigateTo $url"_vti_bin/sts/spsecuritytokenservice.svc"
 #       }
		# For load balance servers, we want to hit each server explicitly
		$alt = Get-SPAlternateURL -WebApplication $wa.url -Zone Intranet
		
		foreach ($incoming in $alt) {
            $url = $incoming.IncomingUrl
            NavigateTo $url
            NavigateTo $url"_api/web"
            NavigateTo $url"_api/_trust" # for ADFS, first user login
            NavigateTo $url"_layouts/viewlsts.aspx"
            NavigateTo $url"_vti_bin/UserProfileService.asmx"
            NavigateTo $url"_vti_bin/sts/spsecuritytokenservice.svc"
			
			# Warm Up Individual Site Collections and Sites
			foreach($site in $wa.Sites){
				foreach($web in $site.AllWebs){
					$web_url = $url + $web.ServerRelativeUrl
					NavigateTo $web_url
				}
			}
        }
		
        # Warm Up Individual Site Collections and Sites
#        foreach($site in $wa.Sites){
#            foreach($web in $site.AllWebs){
#                $url = $web.Url
#                NavigateTo $url
#            }
#        }
		
        # Central Admin
        if ($wa.IsAdministrationWebApplication) {
            $url = $wa.Url
            NavigateTo $url"Lists/HealthReports/AllItems.aspx"
            NavigateTo $url"_admin/FarmServers.aspx"
            NavigateTo $url"_admin/Server.aspx"
            NavigateTo $url"_admin/WebApplicationList.aspx"
            NavigateTo $url"_admin/ServiceApplications.aspx"
			
            # Manage Service Application
            $sa = Get-SPServiceApplication
            $links = $sa | ForEach-Object {$_.ManageLink.Url} | Select-Object -Unique
            foreach ($link in $links) {
                $ml = $link.TrimStart('/')
                NavigateTo "$url$ml"
            }
        }
    }
	
    # Warm up Service Applications
    Get-SPServiceApplication | ForEach-Object {$_.EndPoints | ForEach-Object {$_.ListenUris | ForEach-Object {NavigateTo $_.AbsoluteUri}}}

    # Warm up Project Server
    Write-Output "Opening Project Server PWAs..."
    if ((Get-Command Get-SPProjectWebInstance -ErrorAction SilentlyContinue).Count -gt 0) {
        Get-SPProjectWebInstance | ForEach-Object {
            # Thanks to Eugene Pavlikov for the snippet
            $url = ($_.Url).AbsoluteUri + "/"
		
            NavigateTo $url
            NavigateTo ($url + "_layouts/viewlsts.aspx")
            NavigateTo ($url + "_vti_bin/UserProfileService.asmx")
            NavigateTo ($url + "_vti_bin/sts/spsecuritytokenservice.svc")
            NavigateTo ($url + "Projects.aspx")
            NavigateTo ($url + "Approvals.aspx")
            NavigateTo ($url + "Tasks.aspx")
            NavigateTo ($url + "Resources.aspx")
            NavigateTo ($url + "ProjectBICenter/Pages/Default.aspx")
            NavigateTo ($url + "_layouts/15/pwa/Admin/Admin.aspx")
        }
    }

    # Warm up Topology
    NavigateTo "http://localhost:32843/Topology/topology.svc"
	
    # Warm up Host Name Site Collections (HNSC)
    Write-Output "Opening Host Name Site Collections (HNSC)..."
    $hnsc = Get-SPSite -Limit All | Where-Object {$_.HostHeaderIsSiteName -eq $true} | Select-Object Url
    foreach ($sc in $hnsc) {
        NavigateTo $sc.Url
    }
}

Function NavigateTo([string] $url) {
    if ($url.ToUpper().StartsWith("HTTP") -and !$url.EndsWith("/ProfileService.svc","CurrentCultureIgnoreCase")) {
        Write-Host "  $url" -NoNewLine
        # WebRequest command line
        try {
            $wr = Invoke-WebRequest -Uri $url -UseBasicParsing -UseDefaultCredentials -TimeoutSec 120
            FetchResources $url $wr.Images
            FetchResources $url $wr.Scripts
            Write-Host "."
        } catch {
            $httpCode = $_.Exception.Response.StatusCode.Value__
            if ($httpCode) {
                Write-Host "   [$httpCode]" -Fore Yellow
            } else {
                Write-Host " "
            }
        }
    }
}

Function FetchResources($baseUrl, $resources) {
    # Download additional HTTP files
    [uri]$uri = $baseUrl
    $rootUrl = $uri.Scheme + "://" + $uri.Authority
	
    # Loop
    $counter = 0
    foreach ($res in $resources) {
        # Support both abosolute and relative URLs
        $resUrl  = $res.src
        if ($resUrl.ToUpper().Contains("HTTP")) {
            $fetchUrl = $res.src
        } else {
            if (!$resUrl.StartsWith("/")) {
                $resUrl = "/" + $resUrl
            }
            $fetchUrl = $rootUrl + $resUrl
        }

        # Progress
        Write-Progress -Activity "Opening " -Status $fetchUrl -PercentComplete (($counter/$resources.Count)*100)
        $counter++
		
        # Execute
        $resp = Invoke-WebRequest -UseDefaultCredentials -UseBasicParsing -Uri $fetchUrl -TimeoutSec 120
        Write-Host "." -NoNewLine
    }
    Write-Progress -Activity "Completed" -Completed
}

Function CreateLog() {
    # EventLog - create source if missing
    if (!(Get-EventLog -LogName Application -Source "SPBestWarmUp" -ErrorAction SilentlyContinue)) {
        New-EventLog -LogName Application -Source "SPBestWarmUp" -ErrorAction SilentlyContinue | Out-Null
    }
}

Function WriteLog($text, $color) {
    $global:msg += "`n$text"
    if ($color) {
        Write-Host $text -Fore $color
    } else {
        Write-Output $text
    }
}

Function SaveLog($id, $txt, $error) {
    # EventLog
    if (!$skiplog) {
        if (!$error) {
            # Success
            $global:msg += $txt
            Write-EventLog -LogName Application -Source "SPBestWarmUp" -EntryType Information -EventId $id -Message $global:msg
        } else {      
            # Error
            $global:msg += $error[0].Exception.ToString() + "`r`n" + $error[0].ErrorDetails.Message
            Write-EventLog -LogName Application -Source "SPBestWarmUp" -EntryType Warning -EventId $id -Message $global:msg
        }
    }
}

# Main
CreateLog

# Check Permission Level
if (!([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "You do not have elevated Administrator rights to run this script.`nPlease re-run as Administrator."
    break
} else {
    try {
        # SharePoint cmdlets
        Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue | Out-Null

        # Core
        WarmUp
		
    } catch {
        SaveLog 201 "ERROR" $error
    }
}