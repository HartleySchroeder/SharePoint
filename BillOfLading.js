$(document).ready(function () {	
	var RefNum = $("input[title='Bill of Lading'");
	RefNum.closest('tr').hide();

	var EmergencyPhone = $("input[title='Emergency Phone'");
	EmergencyPhone.closest('tr').hide();
	
	var docName = $("input[title='Name Required Field']");
	docName.prop("disabled", true);
	
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
	
	Autocomplete('Name of Carrier');
});

function PreSaveAction()
{
	var PartTable = document.getElementById("table_id");
	var rowCount = $("#table_id tr").length;
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

			$("input[title='col1row" + i + "']").val(txtUnit);
			$("input[title='col2row" + i + "']").val(txtDesc);
			$("input[title='col3row" + i + "']").val(txtTotal);
			$("input[title='col4row" + i + "']").val(txtWeight);
			$("input[title='col5row" + i + "']").val(txtRate);
			$("input[title='col6row" + i + "']").val(txtCharges);

			if($(row.cells[2]).find('input')[0].checked)
			{
				$("input[title='chk1row" + i + "']")[0].checked = true;
				DGflag = true;
			}
			else
			{
				$("input[title='chk1row" + i + "']")[0].checked = false;
			}
		}
		else
		{
			$("input[title='col1row" + i + "']").val("");
			$("input[title='chk1row" + i + "']")[0].checked = false;
			$("input[title='col2row" + i + "']").val("");
			$("input[title='col3row" + i + "']").val("");
			$("input[title='col4row" + i + "']").val("");
			$("input[title='col5row" + i + "']").val("");
			$("input[title='col6row" + i + "']").val("");
		}
	}

	if(DGflag == true)
	{
		$("input[title='Emergency Phone'").val("1-613-996-6666 Canutec");
	}
	else
	{
		$("input[title='Emergency Phone'").val("");
	}
	var docName = $("input[title='Name Required Field']").val();
	var RefNum = $("input[title='Bill of Lading'").val(docName);
	$("input[title='Form Type']").val("Bill of Lading");

	return true;
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
	var txtDG = chkRowField(Detail.DG);
	var txtDesc = txtRowField(Detail.Desc);
	var txtTotal = txtRowField(Detail.Total);
	var txtWeight = txtRowField(Detail.Weight);
	var txtRate = txtRowField(Detail.Rate);
	var txtCharges = txtRowField(Detail.Charges);
	
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
	addDetailRow(Detail, 11);
}