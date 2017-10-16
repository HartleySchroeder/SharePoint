$(document).ready(function () {	
	var RefNum = $("input[title='Bill of Lading']");
	RefNum.closest('tr').hide();

	var EmergencyPhone = $("input[title='Emergency Phone']");
	EmergencyPhone.closest('tr').hide();
	
	for(i = 1; i <= 10; i++)
	{
		var txtUnit = $("input[title='col1row" + i + "']");
		var txtDG = $("input[title='chk1row" + i + "']");
		var txtDesc = $("input[title='col2row" + i + "']");
		var txtTotal = $("input[title='col3row" + i + "']");
		var txtWeight = $("input[title='col4row" + i + "']");
		var txtRate = $("input[title='col5row" + i + "']");
		var txtCharges = $("input[title='col6row" + i + "']");
		txtUnit.closest('tr').hide();
		txtDG.closest('tr').hide();
		txtDesc.closest('tr').hide();
		txtTotal.closest('tr').hide();
		txtWeight.closest('tr').hide();
		txtRate.closest('tr').hide();
		txtCharges.closest('tr').hide();		
		
		var Detail = {
			Unit : '',
			DG : '',
			Desc : '',
			Total: '',
			Weight : '',
			Rate : '',
			Charges : ''
		};
		
		var emptyRow = true;
		
		emptyRow = checkEmptyRow(txtUnit, emptyRow);
		emptyRow = checkEmptyRow(txtDesc, emptyRow);
		emptyRow = checkEmptyRow(txtTotal, emptyRow);
		emptyRow = checkEmptyRow(txtWeight, emptyRow);
		emptyRow = checkEmptyRow(txtRate, emptyRow);
		emptyRow = checkEmptyRow(txtCharges, emptyRow);

		if(emptyRow == false)
		{
			Detail.Unit = txtUnit.val();
			Detail.DG = txtDG[0].checked;
			Detail.Desc = txtDesc.val();
			Detail.Total = txtTotal.val();
			Detail.Weight = txtWeight.val();
			Detail.Rate = txtRate.val();
			Detail.Charges = txtCharges.val();
			
			LoadRows(Detail);
			emptyRow = true;
		}
	}
	hideTableCheck();
	
	Autocomplete('To Company');
});

function PreSaveAction()
{
	var PartTable = $("#table_id")[0];
	var rowCount = $("#table_id tr").length;
	var col1Array = [];
	var col2Array = [];
	var col3Array = [];
	var col4Array = [];
	var col5Array = [];
	var col6Array = [];
	var colChkArray = [];
	var DGflag = false;

	for(i = 1; i <= 10; i++)
	{
		if(i < rowCount)
		{
			var row = PartTable.rows[i];
			var txtUnit = $(row.cells[1]).find('input').val();
			var txtDesc = $(row.cells[3]).find('input').val();
			var txtTotal = $(row.cells[4]).find('input').val();
			var txtWeight = $(row.cells[5]).find('input').val();
			var txtRate = $(row.cells[6]).find('input').val();
			var txtCharges = $(row.cells[7]).find('input').val();

			col1Array[i] = txtUnit;
			col2Array[i] = txtDesc;
			col3Array[i] = txtTotal;
			col4Array[i] = txtWeight;
			col5Array[i] = txtRate;
			col6Array[i] = txtCharges;

			if($(row.cells[2]).find('input')[0].checked)
			{
				colChkArray[i] = true;
				DGflag = true;
			}
			else
			{
				colChkArray[i] = false;
			}
		}
		else
		{
			col1Array[i] = "";
			col2Array[i] = "";
			col3Array[i] = "";
			col4Array[i] = "";
			col5Array[i] = "";
			col6Array[i] = "";
			colChkArray[i] = false;
		}
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
				"Bill_x0020_Of_x0020_Lading": $("input[title='Name Required Field']").val(),
				"From_x0020_Company": $("input[title='From Company']").val(),
				"From_x0020_Origin": $("input[title='From Origin']").val(),
				"From_x0020_Street": $("input[title='From Street']").val(),
				"Name_x0020_of_x0020_Carrier": $("input[title='Name of Carrier']").val(),
				"Carrier_x0020_Reference_x0020_No": $("input[title='Carrier Reference No']").val(),
				"Form_x0020_Date": new Date($("input[title='Form Date']").val()),
				"To_x0020_Company": $("input[title='To Company']").val(),
				"To_x0020_Street": $("input[title='To Street']").val(),
				"To_x0020_Destination": $("input[title='To Destination']").val(),
				"To_x0020_Postal_x0020_Code": $("input[title='To Postal Code']").val(),
				"To_x0020_Route": $("input[title='To Route']").val(),
				"Vehicle_x0020_No": $("input[title='Vehicle No']").val(),
				"Placards_x0020_Type": $("input[title='Placards Type']").val(),
				"ERAP": $("input[title='ERAP']").val(),
				"Remit_x0020_To": $("input[title='Remit To']").val(),
				"Remit_x0020_Address": $("input[title='Remit Address']").val(),
				"COD_x0020_Amount": parseFloat($("input[title='COD Amount']").val()),
				"COD_x0020_Fee": $("select[title='COD Fee']")[0].value,
				"COD_x0020_Total_x0020_Charges": parseFloat($("input[title='COD Total Charges']").val()),
				"Freight_x0020_Charges": $("input[title='Freight Charges']")[0].checked,
				"Declared_x0020_Value": parseFloat($("input[title='Declared Value']").val()),
				"Declared_x0020_Value_x0020_Par": $("input[title='Declared Value Par']").val(),
				"Emergency_x0020_Phone": "",
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
				"col4row10": col4Array[10],
				"col5row1": col5Array[1],
				"col5row2": col5Array[2],
				"col5row3": col5Array[3],
				"col5row4": col5Array[4],
				"col5row5": col5Array[5],
				"col5row6": col5Array[6],
				"col5row7": col5Array[7],
				"col5row8": col5Array[8],
				"col5row9": col5Array[9],
				"col5row10": col5Array[10],
				"col6row1": col6Array[1],
				"col6row2": col6Array[2],
				"col6row3": col6Array[3],
				"col6row4": col6Array[4],
				"col6row5": col6Array[5],
				"col6row6": col6Array[6],
				"col6row7": col6Array[7],
				"col6row8": col6Array[8],
				"col6row9": col6Array[9],
				"col6row10": col6Array[10],
				"chk1row1": colChkArray[1],
				"chk1row2": colChkArray[2],
				"chk1row3": colChkArray[3],
				"chk1row4": colChkArray[4],
				"chk1row5": colChkArray[5],
				"chk1row6": colChkArray[6],
				"chk1row7": colChkArray[7],
				"chk1row8": colChkArray[8],
				"chk1row9": colChkArray[9],
				"chk1row10": colChkArray[10]
			};
		
			if(DGflag)
			{
				item.Emergency_x0020_Phone = "1-613-996-6666 Canutec";
			}

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

function CreatePartRow(Detail) 
{
	var itemRow = document.createElement("tr");
	var DelButton = document.createElement("td");
	var Unit = document.createElement("td");
	var DG = document.createElement("td");
	var Desc = document.createElement("td");
	var Total = document.createElement("td");
	var Weight = document.createElement("td");
	var Rate = document.createElement("td");
	var Charges = document.createElement("td");

	var btnDel = document.createElement("input");
	btnDel.type = 'button';
	btnDel.value = "remove";
	btnDel.onclick = function() { DeleteRow($(this), 7); };
	var txtUnit = txtRowField(Detail.Unit);
	txtUnit.maxLength = 20;
	var txtDG = chkRowField(Detail.DG);
	var txtDesc = txtRowField(Detail.Desc);
	txtDesc.maxLength = 160;
	var txtTotal = txtRowField(Detail.Total);
	txtTotal.maxLength = 40;
	var txtWeight = txtRowField(Detail.Weight);
	txtWeight.maxLength = 26;
	var txtRate = txtRowField(Detail.Rate);
	txtRate.maxLength = 14;
	var txtCharges = txtRowField(Detail.Charges);
	txtCharges.maxLength = 36;
	
	DelButton.appendChild(btnDel);
	Unit.appendChild(txtUnit);
	DG.appendChild(txtDG);
	Desc.appendChild(txtDesc);
	Total.appendChild(txtTotal);
	Weight.appendChild(txtWeight);
	Rate.appendChild(txtRate);
	Charges.appendChild(txtCharges);

	itemRow.appendChild(DelButton);
	itemRow.appendChild(Unit);
	itemRow.appendChild(DG);
	itemRow.appendChild(Desc);
	itemRow.appendChild(Total);
	itemRow.appendChild(Weight);
	itemRow.appendChild(Rate);
	itemRow.appendChild(Charges);
	return itemRow;
}

function AddDetail()
{
	var Detail = {
		Unit : '',
		DG : '',
		Desc : '',
		Total: '',
		Weight : '',
		Rate : '',
		Charges : ''
	};
	addDetailRow(Detail, 10);
}