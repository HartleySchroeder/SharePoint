$(document).ready(function () {	
	var DocNum = $("input[title='Shipping Advice'");
	DocNum.closest('tr').hide();
	
	var docName = $("input[title='Name Required Field']");
	docName.prop("disabled", true);
	
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
	
	var ddlReason = $("select[title='Reason For Shipping'");
	var ddlReasonSelected = ddlReason.find("option:selected").text();

	var lblReason = document.createElement("div");
	reasonText.closest('tr').show();
	reasonText.closest('td').prev('td').text("");

	reasonText.val(reasonText.val().substring(reasonText.val().indexOf(":") + 2));
	
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
	var txtInvoice_Num = txtRowField(Detail.Invoice_Num);
	var txtQuantity = txtRowField(Detail.Quantity);
	var txtDescription = txtRowField(Detail.Description);

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
	var PartTable = document.getElementById("table_id");
	var rowCount = $("#table_id tr").length;
	for(i = 1; i <= 10; i++)
	{
		if(i < rowCount)
		{
			var row = PartTable.rows[i];
			var txtPO_Num = $(row.cells[1]).find('input').val();
			var txtInvoice_Num = $(row.cells[2]).find('input').val();
			var txtQuantity = $(row.cells[3]).find('input').val();
			var txtDescription = $(row.cells[4]).find('input').val();

			$("input[title='col1row" + i + "']").val(txtPO_Num);
			$("input[title='col2row" + i + "']").val(txtInvoice_Num);
			$("input[title='col3row" + i + "']").val(txtQuantity);
			$("input[title='col4row" + i + "']").val(txtDescription);
		}
		else
		{
			$("input[title='col1row" + i + "']").val("");
			$("input[title='col2row" + i + "']").val("");
			$("input[title='col3row" + i + "']").val("");
			$("input[title='col4row" + i + "']").val("");
		}
	}

	var reasonDesc = $("input[title='Reason For Shipping Desc']");
	var ddlReason = $("select[title='Reason For Shipping'");
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

	var docNum = $("input[title='Name Required Field']").val();
	$("input[title='Shipping Advice']").val(docNum);
	$("input[title='Form Type']").val("Shipping Advice");

	return true;
}