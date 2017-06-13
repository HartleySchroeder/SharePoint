<script src="http://spapps.intranet.mbgov.ca/sites/mit/SIMS/SiteAssets/jquery-1.12.4.js"></script>
<script src="http://spapps.intranet.mbgov.ca/sites/mit/SIMS/SiteAssets/jquery.SPServices-2014.02.min.js" type="text/javascript"></script>

<button id="copyButton">Start Copy</button>

<script>
//Update these above links
//must be run on a modern browser for the Date functions to work
var buttonClick = $("#copyButton").click(function() {
	var listItems = $().SPServices({
		operation: "GetListItems",
		listName: "Requests",//change this
		async: false,
		CAMLViewFields: "<ViewFields><FieldRef Name='ID' /></ViewFields>",
		completefunc: function () {}			
	});

	var temp = "";
	var tempID;
	$(listItems.responseXML).SPFilterNode("z:row").each(function() {
		tempID = $(this).attr("ows_ID");
		//tempID = 5882;
		$().SPServices({
		  operation: "GetVersionCollection",
		  async: false,
		  strlistID: "Requests",//change this
		  strlistItemID: tempID,
		  strFieldName: "Comments",
		  completefunc: function (xData, Status) {
			$(xData.responseText).find("Version").each(function(i) {
				console.log(tempID);
				var modBy = $(this).attr("Editor");
				modBy = modBy.substr(modBy.lastIndexOf("#")+1);
				modBy = modBy.replace(",,", ",");
				var iniDate = new Date($(this).attr("Modified"));
				var date = iniDate.toString();
				date = date.toString().substr(3, date.indexOf("G")-3);
				var comments = $(this).attr("Comments");
				comments = comments.replace("<div>", "").replace("</div>", "");
				if (comments != "")
				{
					temp = temp + modBy + " ( " + date + "): <![CDATA[" + comments + "<br>]]>";
				}
			}); 
		  }
		});

		$().SPServices({
				operation: "UpdateListItems",
				listName: "Requests",//change this
				ID: tempID,
				valuepairs: [["Plain_x0020_Text_x0020_Working_x", temp],["Comments", ""]],
				completefunc: function () {}
			});
		temp = "";
	});
});
</script>