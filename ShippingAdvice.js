$(document).ready(function () {	
	var DocNum = $("input[title='Document Number'");
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
		var txtPO_Num = $("input[title='PO_Num" + i + "']");
		var txtInvoice_Num = $("input[title='Invoice_Num" + i + "']");
		var txtQuantity = $("input[title='Quantity" + i + "']");
		var txtDescription = $("input[title='Description" + i + "']");
		txtPO_Num.closest('tr').hide();
		txtInvoice_Num.closest('tr').hide();
		txtQuantity.closest('tr').hide();
		txtDescription.closest('tr').hide();

		var emptyRow = true;
		
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
	
	var reasonText = $("textarea[title='Reason For Returning Text']");
	reasonText.closest('tr').hide();
	
	var ddlReason = $("select[title='Reason For Returning'");
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
	
	hideTableCheck();
	var vendor = Autocomplete('ShippingAdvice', 'Vendor');
	
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
	var txtPO_Num = document.createElement("input");
	txtPO_Num.type = 'text';
	txtPO_Num.value = Detail.PO_Num;
	var txtInvoice_Num = document.createElement("input");
	txtInvoice_Num.type = 'text';
	txtInvoice_Num.value = Detail.Invoice_Num;
	var txtQuantity = document.createElement("input");
	txtQuantity.type = 'text';
	txtQuantity.value = Detail.Quantity;
	var txtDescription = document.createElement("input");
	txtDescription.type = 'text';
	txtDescription.value = Detail.Description;

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

			$("input[title='PO_Num" + i + "']").val(txtPO_Num);
			$("input[title='Invoice_Num" + i + "']").val(txtInvoice_Num);
			$("input[title='Quantity" + i + "']").val(txtQuantity);
			$("input[title='Description" + i + "']").val(txtDescription);
		}
		else
		{
			$("input[title='PO_Num" + i + "']").val("");
			$("input[title='Invoice_Num" + i + "']").val("");
			$("input[title='Quantity" + i + "']").val("");
			$("input[title='Description" + i + "']").val("");
		}
	}
  
	var docNum = $("input[title='Name Required Field']").val();
	$("input[title='Document Number']").val(docNum);
	$("input[title='Form_Type']").val("Shipping Advice");

	return true;
}