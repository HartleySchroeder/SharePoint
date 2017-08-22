
$SPwebApps = Get-SPWebApplication
$listitems = "<html><table><tr><th>List Name</th><th>URL</th><th>Number of Items</th></tr>"
foreach($SPwebApp in $SPwebApps){
    foreach($SPsite in $SPwebApps.Sites)
    {
        foreach($SPweb in $SPSite.AllWebs)
        {
        foreach($SPlist in $SPweb.Lists)
            {
            if(($splist.ItemCount -gt 4000) -and ($splist.ItemCount -lt 5000))
                {
                    $listitems = $listitems + "<tr><td>" + $SPlist.Title + "</td><td>" + $SPweb.URL + "</td><td>" + $SPlist.ItemCount + "</td></tr>"
                }
             }
            $SPweb.Dispose()
        }
        $SPsite.Dispose()
    }
}
$listitems = $listitems + "</table></html>"