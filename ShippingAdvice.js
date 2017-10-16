$(document).ready(function () {	
	var DocNum = $("input[title='Shipping Advice']");
	DocNum.closest('tr').hide();
	
	var Detail = {
		PO_Num : '',
		Invoice_Num : '',
		Quantity : '',
		Description: ''
	  };
	
	var emptyRow = true;
	
	for(i = 1; i <= 10; i++)
	{
		var txtPO_Num = $("input[title='col1row" + i + "']");
		var txtInvoice_Num = $("input[title='col2row" + i + "']");
		var txtQuantity = $("input[title='col3row" + i + "']");
		var txtDescription = $("input[title='col4row" + i + "']");
		txtPO_Num.closest('tr').hide();
		txtInvoice_Num.closest('tr').hide();
		txtQuantity.closest('tr').hide();
		txtDescription.closest('tr').hide();

		emptyRow = true;
		
		emptyRow = checkEmptyRow(txtPO_Num, emptyRow);
		emptyRow = checkEmptyRow(txtInvoice_Num, emptyRow);
		emptyRow = checkEmptyRow(txtQuantity, emptyRow);
		emptyRow = checkEmptyRow(txtDescription, emptyRow);

		if(emptyRow == false)
		{
			Detail.PO_Num = txtPO_Num.val();
			Detail.Invoice_Num = txtInvoice_Num.val();
			Detail.Quantity = txtQuantity.val();
			Detail.Description = txtDescription.val();
			
			LoadRows(Detail);
			emptyRow = true;
		}
	}
	
	var reasonText = $("textarea[title='Reason For Shipping Text']");
	reasonText.closest('tr').hide();
	var reasonDesc = $("input[title='Reason For Shipping Desc']");
	reasonDesc.closest('tr').hide();

	reasonText.attr('maxlength','250');
	
	var ddlReason = $("select[title='Reason For Shipping']");
	var ddlReasonSelected = ddlReason.find("option:selected").text();

	var lblReason = document.createElement("div");
	reasonText.closest('tr').show();
	reasonText.closest('td').prev('td').text("");
	
	if(ddlReasonSelected == "CREDIT") {
		lblReason.innerHTML = "RMA Number";
	}
	else if(ddlReasonSelected == "REPAIR") {
		lblReason.innerHTML = "Please advise buyer of price and delivery before proceeding";
	}
	else if(ddlReasonSelected == "EXCHANGE/INCORRECT GOODS SUPPLIED") {
		lblReason.innerHTML = "Vendor RMA Number";
	}
	else if(ddlReasonSelected == "OTHER") {
		lblReason.innerHTML = "Other Reason";
	}
	else if(ddlReasonSelected == "") {
		reasonText.closest('tr').hide();
		reasonText.val("");
	}
	reasonText.closest('td').prepend(lblReason);
	
	ddlReason.change(function(){
        var selected = $(this).find("option:selected").text();
		reasonText.closest('tr').show();
		reasonText.closest('td').prev('td').text("");
		
        if(selected == "CREDIT") {
			lblReason.innerHTML = "RMA Number";
        }
		else if(selected == "REPAIR") {
			lblReason.innerHTML = "Please advise buyer of price and delivery before proceeding";
        }
		else if(selected == "EXCHANGE/INCORRECT GOODS SUPPLIED") {
			lblReason.innerHTML = "Vendor RMA Number";
        }
		else if(selected == "OTHER") {
			lblReason.innerHTML = "Other Reason";
        }
		else if(selected == "") {
			reasonText.closest('tr').hide();
			reasonText.val("");
        }
    });
	
	$("textarea[title='Ship To']").attr('maxlength','250');

	hideTableCheck();
	Autocomplete('Vendor');
	Autocomplete('Ship Carrier');
});

function AddDetail()
{
	var Detail = {
		PO_Num : '',
		Invoice_Num : '',
		Quantity : '',
		Description: ''
	};
	addDetailRow(Detail, 10);
}

function CreatePartRow(Detail) {
	var PartRow = document.createElement("tr");
	var DelButton = document.createElement("td");
	var PO_Num = document.createElement("td");
	var Invoice_Num = document.createElement("td");
	var Quantity = document.createElement("td");
	var Description = document.createElement("td");

	var btnDel = document.createElement("input");
	btnDel.type = 'button';
	btnDel.value = "remove";
	btnDel.onclick = function() { DeleteRow($(this), 5); };
	var txtPO_Num = txtRowField(Detail.PO_Num);
	txtPO_Num.maxLength = 22;
	var txtInvoice_Num = txtRowField(Detail.Invoice_Num);
	txtInvoice_Num.maxLength = 22;
	var txtQuantity = txtRowField(Detail.Quantity);
	txtQuantity.maxLength = 14;
	var txtDescription = txtRowField(Detail.Description);
	txtDescription.maxLength = 150;

	DelButton.appendChild(btnDel);
	PO_Num.appendChild(txtPO_Num);
	Invoice_Num.appendChild(txtInvoice_Num);
	Quantity.appendChild(txtQuantity);
	Description.appendChild(txtDescription);

	PartRow.appendChild(DelButton);
	PartRow.appendChild(PO_Num);
	PartRow.appendChild(Invoice_Num);
	PartRow.appendChild(Quantity);
	PartRow.appendChild(Description);
	return PartRow;
}

function PreSaveAction()
{
	var PartTable = $("#table_id")[0];
	var rowCount = $("#table_id tr").length;
	var col1Array = [];
	var col2Array = [];
	var col3Array = [];
	var col4Array = [];

	for(i = 1; i <= 10; i++)
	{
		if(i < rowCount)
		{
			var row = PartTable.rows[i];
			var txtPO_Num = $(row.cells[1]).find('input').val();
			var txtInvoice_Num = $(row.cells[2]).find('input').val();
			var txtQuantity = $(row.cells[3]).find('input').val();
			var txtDescription = $(row.cells[4]).find('input').val();

			col1Array[i] = txtPO_Num;
			col2Array[i] = txtInvoice_Num;
			col3Array[i] = txtQuantity;
			col4Array[i] = txtDescription;
		}
		else
		{
			col1Array[i] = "";
			col2Array[i] = "";
			col3Array[i] = "";
			col4Array[i] = "";
		}
	}

	var reasonDesc = $("input[title='Reason For Shipping Desc']");
	var ddlReason = $("select[title='Reason For Shipping']");
	var ddlReasonSelected = ddlReason.find("option:selected").text();

	if(ddlReasonSelected == "CREDIT") {
		reasonDesc.val("RMA Number");
	}
	else if(ddlReasonSelected == "REPAIR") {
		reasonDesc.val("Advise buyer of price and delivery");
	}
	else if(ddlReasonSelected == "EXCHANGE/INCORRECT GOODS SUPPLIED") {
		reasonDesc.val("Vendor RMA Number");
	}
	else if(ddlReasonSelected == "OTHER") {
		reasonDesc.val("Other Reason");
	}
	else if(ddlReasonSelected == "") {
		reasonDesc.val("");
	}

	var regID = new RegExp("[\\?&]"+"ID"+"=([^&#]*)");
	var queryID = regID.exec(window.location.href);

	$.ajax({
		url: "https://potashcorp.sharepoint.com/sites/forms/Shipping/_api/web/lists/GetById('" + _spPageContextInfo.pageListId + "')/items?$filter=(ID eq '" + queryID[1] + "')",
		method: "GET",
		headers: { "Accept": "application/json; odata=verbose" },
		success: function (data) {
			var item = {
				"__metadata": { "type": data.d.results[0].__metadata.type },
				"Shipping_x0020_Advice": $("input[title='Name Required Field']").val(),
				"From_x0020_Company": $("input[title='From Company']").val(),
				"From_x0020_Origin": $("input[title='From Origin']").val(),
				"From_x0020_Phone": $("input[title='From Phone']").val(),
				"Ship_x0020_To": $("textarea[title='Ship To']").val(),
				"Ship_x0020_Date": new Date($("input[title='Ship Date']").val()),
				"Attention": $("input[title='Attention']").val(),
				"Contact_x0020_Number": $("input[title='Contact Number']").val(),
				"Ship_x0020_Carrier": $("input[title='Ship Carrier']").val(),
				"Waybill_x0020_Number": $("input[title='Waybill Number']").val(),
				"Payment": $("select[title='Payment']")[0].value,
				"Reason_x0020_For_x0020_Shipping": $("select[title='Reason For Shipping']")[0].value,
				"Reason_x0020_For_x0020_Shipping_x0020_Desc": $("input[title='Reason For Shipping Desc']").val(),
				"Reason_x0020_For_x0020_Shipping_x0020_Text": $("textarea[title='Reason For Shipping Text']").val(),
				"Shipper": $("input[title='Shipper']").val(),
				"col1row1": col1Array[1],
				"col1row2": col1Array[2],
				"col1row3": col1Array[3],
				"col1row4": col1Array[4],
				"col1row5": col1Array[5],
				"col1row6": col1Array[6],
				"col1row7": col1Array[7],
				"col1row8": col1Array[8],
				"col1row9": col1Array[9],
				"col1row10": col1Array[10],
				"col2row1": col2Array[1],
				"col2row2": col2Array[2],
				"col2row3": col2Array[3],
				"col2row4": col2Array[4],
				"col2row5": col2Array[5],
				"col2row6": col2Array[6],
				"col2row7": col2Array[7],
				"col2row8": col2Array[8],
				"col2row9": col2Array[9],
				"col2row10": col2Array[10],
				"col3row1": col3Array[1],
				"col3row2": col3Array[2],
				"col3row3": col3Array[3],
				"col3row4": col3Array[4],
				"col3row5": col3Array[5],
				"col3row6": col3Array[6],
				"col3row7": col3Array[7],
				"col3row8": col3Array[8],
				"col3row9": col3Array[9],
				"col3row10": col3Array[10],
				"col4row1": col4Array[1],
				"col4row2": col4Array[2],
				"col4row3": col4Array[3],
				"col4row4": col4Array[4],
				"col4row5": col4Array[5],
				"col4row6": col4Array[6],
				"col4row7": col4Array[7],
				"col4row8": col4Array[8],
				"col4row9": col4Array[9],
				"col4row10": col4Array[10]
			};
			$.ajax({
				url: data.d.results[0].__metadata.uri,
				type: "POST",
				contentType: "application/json;odata=verbose",
				data: JSON.stringify(item),
				headers: {
					"Accept": "application/json;odata=verbose",
					"X-RequestDigest": $("#__REQUESTDIGEST").val(),
					"X-HTTP-Method": "MERGE",
					"If-Match": data.d.results[0].__metadata.etag
				},
				success: function (data) {
					var libUrl = _spPageContextInfo.serverRequestPath.substr(0, _spPageContextInfo.serverRequestPath.indexOf("/Forms/"));
					var listName = libUrl.substr(libUrl.lastIndexOf("/") + 1, libUrl.length);
					var listURL = "https://potashcorp.sharepoint.com/sites/forms/Shipping/" + listName;
					GoToPage(listURL);
				},
				error: function (data) {
					console.log(data);
				}
			});
			
		},
		error: function (data) {
			console.log(data);
		}
	});

	return false;
}