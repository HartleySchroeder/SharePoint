foreach($webapp in Get-SPWebApplication){
    foreach($site in $webapp.Sites){
        #$site = Get-SPSite("http://solveraade04/sites/devsite")
        foreach($web in $site.AllWebs){
            foreach($list in $web.Lists){
                if ($list.BaseType -eq "DocumentLibrary" -and $list.BaseTemplate -eq "XMLForm")
                {
                    $url = $list.DefaultNewFormUrl
                    Write-Host "$list , $url , InfoPath form library"
                }
                    elseif ($list.ContentTypes[0].ResourceFolder.Properties["_ipfs_infopathenabled"])
                {
                    $url = $list.DefaultNewFormUrl
                    #$list +"`t" + $url +"`t" + "InfoPath enabled list" >> c:\InfoPathLibs.csv
                    Write-Host "$list , $url , InfoPath enabled list"
                }
            }
            $web.Dispose()
        }
        $site.Dispose()
    }
}