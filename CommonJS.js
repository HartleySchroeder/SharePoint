function txtRowField(field)
{
	var txtField = document.createElement("input");
	txtField.type = 'text';
	txtField.value = field;
	txtField.maxLength = 140;
	return txtField;
}

function chkRowField(field)
{
	var chkField = document.createElement("input");
	chkField.type = 'checkbox';
	chkField.checked = field;
	return chkField;
}

function DeleteRow(sib, cols)
{
	var removeRow = sib.closest('tr');
	for(i = 1; i <= cols; i++)
	{
		if(i == 2)
		{
			$(removeRow[0].cells[i]).find('input')[0].checked = false;	
		}
		else
		{
			$(removeRow[0].cells[i]).find('input').val("");
		}
	}
	
	removeRow.remove();
	hideTableCheck();
	
	$("#btnAddRow").show();
}

function hideTableCheck()
{
	var checkTable = $("#table_id tr");
	var PartTable = $("#table_id");
	if (checkTable.length == 1)
	{
		PartTable.hide();
	}
}

function checkEmptyRow(field, emptyRow)
{
	if(field.val() != "")
	{
		emptyRow = false;
	}
	return emptyRow;
}

function LoadRows(Detail)
{
	var NewRow = CreatePartRow(Detail);
	var PartTable = document.getElementById("table_id");
	PartTable.appendChild(NewRow);
}

function addDetailRow(Detail, rows)
{
	var NewRow = CreatePartRow(Detail);
	var PartTable = $("#table_id");
	var rowCount = $("#table_id tr").length;
	
	if (rowCount == rows)
	{
		$("#btnAddRow").hide();
	}
	
	PartTable.show();
	
	PartTable.append(NewRow);
}

function Autocomplete(FormField) {

	var libUrl = _spPageContextInfo.serverRequestPath.substr(0, _spPageContextInfo.serverRequestPath.indexOf("/Forms/"));
	var listName = libUrl.substr(libUrl.lastIndexOf("/") + 1, libUrl.length);
	var listURL = _spPageContextInfo.webAbsoluteUrl + "/" + listName;
	listName = listName.substr(0,3);

	var txtFormField = $("input[Title='" + FormField + "']");
	
	txtFormField.css("position", "");
	var aK = txtFormField.css("color");
	var aN = txtFormField.css("width");

	txtFormField.closest("span").find("br").remove();
	txtFormField.wrap("<div>");

	var randomNum = Math.floor(Math.random() * 100000);

	var divID = "TypeAhead" + randomNum;
	
	var searchResults = txtFormField.after("<div><ul id='" + divID + "' style='width:" + aN + ";display:none;padding:2px;border:1px solid #2A1FAA;background-color:#FFF;position:absolute;z-index:40;margin:0'></div>");
	var divTypeAhead = $("#" + divID);
	
	$(txtFormField).keyup(function() {
		var textInput = $(this).val();
		
		if (textInput.length < 3) {
			return false;
		}
		
		var itemArray = [];
		var url = "";

		if(FormField == "Ship Carrier")
		{
			url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Carriers')/items?$filter=startswith(Title, '" + textInput + "')";
		}
		else if(FormField == "Name of Carrier")
		{
			url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Carriers')/items?$filter=startswith(Title, '" + textInput + "')";
		}
		else
		{
			url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Vendors')/items?$filter=startswith(Name, '" + textInput + "') and OperatingUnit eq '" + listName + " OU'";
		}
		
		$.ajax({
			url: url,
			method: "GET",
			headers: { "Accept": "application/json; odata=verbose" },
			success: function (data) {

				var items = data.d.results;

				if(FormField == "Ship Carrier" || FormField == "Name of Carrier")
				{
					for(var i = 0; i < items.length; i++)
					{
						itemArray.push(items[i].Title + ";");
					}
				}
				else
				{
					for(var j = 0; j < items.length; j++)
					{
						itemArray.push(items[j].Name + " " + items[j].Title + ";" + items[j].Name + ";" + items[j].Address + ";" + items[j].City + ";" + items[j].State + ";" + items[j].Country + ";" + items[j].Title);
					}
				}
				
				divTypeAhead.css("width", aN);
							
				divTypeAhead.hide();
		
				txtFormField.css({
					"background-image": "url(_layouts/images/REFRESH.GIF)",
					"background-position": "right",
					"background-repeat": "no-repeat"
				});
				
				var aR = "";
				for (O = 0; O < itemArray.length; O++) {								
					aR += "<li style='display: block;position: relative;cursor: pointer;' data-value='" + itemArray[O] + "'>" + itemArray[O].substr(0, itemArray[O].indexOf(";")) + "</li>";
				}
				
				divTypeAhead.html(aR);

				$("#" + divID + " li").click(function() {
					$("#" + divID).fadeOut(1000);
					
					var dispListItem = $(this).data('value');

					var addressArray = dispListItem.split(";");

					if(FormField == 'Ship Carrier')
					{
						$("input[title='Ship Carrier']").val(addressArray[0]);
					}
					if(FormField == 'Name of Carrier')
					{
						$("input[title='Name of Carrier']").val(addressArray[0]);
					}

					dispListItem = dispListItem.substr(dispListItem.indexOf(";") + 1, dispListItem.length);
					addressArray = dispListItem.split(";");

					if(FormField == 'Vendor')
					{
						$("textarea[title='Ship To']").val(addressArray[0] + "\n" + addressArray[1] + "\n" + addressArray[2] + " " + addressArray[3] + "\n" + addressArray[4] + "\n" + addressArray[5]);
						txtFormField.val(addressArray[0]);
					}
					
					if(FormField == 'To Company')
					{
						$("input[title='To Company']").val(addressArray[0]);
						$("input[title='To Street']").val(addressArray[1]);
						$("input[title='To Destination']").val(addressArray[2] + " " + addressArray[3] + ", " + addressArray[4]);
						$("input[title='To Postal Code']").val(addressArray[5]);
					}
										
				}).mouseover(function() {
					var aY = {
						cursor: "hand",
						color: "#ffffff",
						background: "#3399ff"
					};
					$(this).css(aY);
				}).mouseout(function() {
					var aY = {
						cursor: "inherit",
						color: aK,
						background: "transparent"
					};
					$(this).css(aY);
				});
				if (itemArray.length > 0) {
					$("#" + divID).slideDown(1000);
				}
				txtFormField.css("background-image", "");
				
			},
			error: function (data) {
				console.log(data);
			}
		});
	});
}