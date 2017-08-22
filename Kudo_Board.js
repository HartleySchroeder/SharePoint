<script src="https://solveit.solvera.ca/SiteAssets/PageParts/Kudos/jquery-3.2.1.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/SiteAssets/PageParts/common/scripts/moment.min.js"></script>
<link rel="stylesheet" href="/SiteAssets/PageParts/Kudos/kudo.css" type="text/css" media="all">

<br />
<textarea id="txtBox" name="txtBox" cols="40" rows="6" maxlength="140"></textarea>
<br />
<br />
<input id="btnSubmit" type="button" value="Post" onclick="AddData();" />
<br />
<br />
<a href="https://solveit.solvera.ca/_layouts/15/start.aspx#/Lists/Kudos/My%20Posts.aspx">Edit my posts</a>
<br />
<br />
<br />
<div id="contentwrapper" class="border">
	<div id="inner-wrapper">
		<table id="scrollTable">
		</table>
	</div>
	<div id="eraser"></div>
	<div id="red-pen"></div>
    <div id="blue-pen"></div>
</div>

<script type="text/javascript">

	var scrollArea = document.getElementById("scrollTable");
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
	var listItems;
	var listSize;
	var promise1;
	var i = 0;
	var row;
	var cell;
	var dateRange = moment().subtract(30, 'days').toISOString();
	
    promise1 = $.ajax({
        url: siteUrl + "/_api/web/lists/getbytitle('Kudos')/items?$filter=Created ge datetime'" + dateRange + "'&$orderby=Created desc",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" }
    }).then(function(data1) {
		listItems = data1.d.results;
		listSize = listItems.length;
		
		for(var j=0; j <= 3; j++)
		{				
			listItems.forEach(function (entry){
				if((i % 3) == 0)
				{
					row = scrollArea.insertRow(scrollArea.rows.length);
				}
				cell = row.insertCell(0);
				cell.innerHTML = "<div class='limit_width " + entry.Style + "'>" + entry.Kudo + "<br />- " + entry.Poster + "</div>";
				i++;
			});
			
			if (listSize <= 6)
			{
				j = 3;
			}
		}
		
		if (listSize > 6)
		{
			var myAnimation = document.getElementById('inner-wrapper').style;
			myAnimation.setProperty("animation", "moveSlideshow " + (listSize * 10) + "s linear 1s infinite")
			
			var keyframes = '@keyframes moveSlideshow {100%{top:-' + (listSize * 300 + (listSize * 2)) + 'px;}}';
			document.styleSheets[0].insertRule( keyframes, 0 );
		}
	});

	function AddData() {
		if ($("#txtBox").val().length > 0){
			var fontWeight = ["light", "lighter", "normal", "bold", "bolder"];
			var fontSize = ["font24", "font26", "font28"];
			var fontFamily = ["fontFamily1", "fontFamily2", "fontFamily3", "fontFamily4", "fontFamily5"];
			var	textAngle = ["rotate10", "rotateNeg10", "rotate4", "rotateNeg4", "rotate7", "rotateNeg7","rotate2", "rotateNeg2","rotate12", "rotateNeg12"];
			var	fontColor = ["red", "blue", "green", "purple", "brown", "CadetBlue", "DarkOrange", "GoldenRod", "MediumVioletRed", "MediumSeaGreen", "teal", "DarkOrchid"];
			var	textAlign = ["align1", "align2", "align3", "align4", "align5"];
				
			var randFontWeight = fontWeight[Math.floor(Math.random() * fontWeight.length)];
			var randFontSize = fontSize[Math.floor(Math.random() * fontSize.length)];
			var randFontFamily = fontFamily[Math.floor(Math.random() * fontFamily.length)];
			var randTextAngle = textAngle[Math.floor(Math.random() * textAngle.length)];
			var randFontColor = fontColor[Math.floor(Math.random() * fontColor.length)];
			var randTextAlign = textAlign[Math.floor(Math.random() * textAlign.length)];
			
			var userid= _spPageContextInfo.userId;
			var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
			var requestHeaders = { "accept" : "application/json;odata=verbose" };
			$.ajax({
				url : requestUri,
				contentType : "application/json;odata=verbose",
				headers : requestHeaders,
				success : function(data){
					var listName = "Kudos";
					var newItemTitle = $("#txtBox").val();
					var author = data.d.Title.substr(0, data.d.Title.indexOf(' '));
					var newStyle = randFontWeight + " " + randFontSize + " " + randFontFamily + " " + randTextAngle + " " + randFontColor + " " + randTextAlign;
					CreateListItemWithDetails(listName, _spPageContextInfo.webAbsoluteUrl, newItemTitle, newStyle, author, function () {
						location.reload(true);
					}, function(){});
				},
			});
		}
	}

	function CreateListItemWithDetails(listName, webUrl, newItemTitle, newStyle, author, success, failure) {
		var itemType = GetItemTypeForListName(listName);
		var item = {
			"__metadata": { "type": itemType },
			"Title": newItemTitle,
			"Kudo": newItemTitle,
			"Style": newStyle,
			"Poster": author
		};

		$.ajax({
			url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
			type: "POST",
			contentType: "application/json;odata=verbose",
			data: JSON.stringify(item),
			headers: {
				"Accept": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val()
			},
			success: function (data) {
				success(data);
			},
			error: function (data) {
				failure(data);
			}
		});
	}

	function GetItemTypeForListName(name) {
		return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
	}
</script>