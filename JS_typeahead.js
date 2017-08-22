<script language="javascript" src="../../SiteAssets/CommonJS/jquery.min.js" type="text/javascript"></script>
<script language="javascript" src="../../SiteAssets/CommonJS/jquery.SPServices.min.js" type="text/javascript"></script>

<div style="width:100px">
<table id="table_id">
    <thead>
        <tr>
            <th>Our PO Number</th>
            <th>Your Invoice Number</th>
            <th>Quantity Returned</th>
			<th>Description</th>
        </tr>
    </thead>
</table>
 
<input type='button' value = 'Add New' onclick = "AddDetail();">
</div>

<script type="text/javascript">
$(document).ready(function () {	
	var reasonText = $("body").find($("textarea[title='Reason For Returning Text']"));
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
	
	var Detail = {
		PO_Num : '',
		Invoice_Num : '',
		Quantity : '',
		Description: ''
	  };
	
	var emptyRow = true;
	
	for(i = 1; i < 6; i++)
	{
		var txtPO_Num = $("body").find($("input[title='PO_Num" + i + "']"));
		var txtInvoice_Num = $("body").find($("input[title='Invoice_Num" + i + "']"));
		var txtQuantity = $("body").find($("input[title='Quantity" + i + "']"));
		var txtDescription = $("body").find($("input[title='Description" + i + "']"));
		txtPO_Num.closest('tr').hide();
		txtInvoice_Num.closest('tr').hide();
		txtQuantity.closest('tr').hide();
		txtDescription.closest('tr').hide();

		if(txtPO_Num.val() == "")
		{
			txtPO_Num.val(" ");
		}	 
		else
		{
			Detail.PO_Num = txtPO_Num.val();
			emptyRow = false;
		}

		if(txtInvoice_Num.val() == "")
		{
			txtInvoice_Num.val(" ");
		}	 
		else
		{
			Detail.Invoice_Num = txtInvoice_Num.val();
			emptyRow = false;
		}

		if(txtQuantity.val() == "")
		{
			txtQuantity.val(" ");
		}	 
		else
		{
			Detail.Quantity = txtQuantity.val();
			emptyRow = false;
		}

		if(txtDescription.val() == "")
		{
			txtDescription.val(" ");
		}	 
		else
		{
			Detail.Description = txtDescription.val();
			emptyRow = false;
		}

		if(emptyRow == false)
		{
			LoadRows(Detail);
			emptyRow = true;
		}
	}
	var PartTable = $("#table_id tr");
	if (PartTable.length == 1)
	{
		PartTable.hide();
	}
	var vendor = SPAutocomplete();
	
});
	
	function LoadRows(Detail)
	{
		var NewRow = CreatePartRow(Detail);
		var PartTable = document.getElementById("table_id");
		PartTable.appendChild(NewRow);
	}
	
	function AddDetail()
	{
		var Detail = {
			PO_Num : '',
			Invoice_Num : '',
			Quantity : '',
			Description: ''
		};
		var NewRow = CreatePartRow(Detail);
		var PartTable = $("#table_id");
		
		PartTable.show();
		
		PartTable.append(NewRow);
	}

function CreatePartRow(Detail) {
	  var PartRow = document.createElement("tr");
	  var PO_Num = document.createElement("td");
	  var Invoice_Num = document.createElement("td");
	  var Quantity = document.createElement("td");
	  var Description = document.createElement("td");

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
	
	  PO_Num.appendChild(txtPO_Num);
	  Invoice_Num.appendChild(txtInvoice_Num);
	  Quantity.appendChild(txtQuantity);
	  Description.appendChild(txtDescription);
	
	  PartRow.appendChild(PO_Num);
	  PartRow.appendChild(Invoice_Num);
	  PartRow.appendChild(Quantity);
	  PartRow.appendChild(Description);
	  return PartRow;
}

function PreSaveAction()
{
  var Details = [];
  var PartTable = document.getElementById("table_id");
  var rowCount = $("#table_id tr").length;
  for(i = 1; i < rowCount; i++)
  {
	 var row = PartTable.rows[i];
	 var txtPO_Num = $(row.cells[0]).find('input').val();
	 var txtInvoice_Num = $(row.cells[1]).find('input').val();
	 var txtQuantity = $(row.cells[2]).find('input').val();
	 var txtDescription = $(row.cells[3]).find('input').val();
	 
	 $("body").find($("input[title='PO_Num" + i + "']")).val(txtPO_Num);
	 $("body").find($("input[title='Invoice_Num" + i + "']")).val(txtInvoice_Num);
	 $("body").find($("input[title='Quantity" + i + "']")).val(txtQuantity);
	 $("body").find($("input[title='Description" + i + "']")).val(txtDescription);
  }
  
  var docNum = $("body").find($("input[title='Name Required Field']")).val();
  $("body").find($("input[title='Document Number']")).val(docNum.substr(docNum.indexOf("-") + 2, docNum.lenght));
 
  return true;
}
	
function SPAutocomplete() {
		var vendorObj = [];
        var aJ = {
			sourceList: "Vendors",
            sourceColumn: "Name",
            columnName: "Vendor",
			WebURL: "https://potashcorp.sharepoint.com/sites/itdev/",
            ignoreCase: true,
            numChars: 3,
            slideDownSpeed: 1000,
			debug: true,
            webURL: "",
            listName: $().SPServices.SPListNameFromUrl(),
            CAMLQuery: "",
            CAMLQueryOptions: "<QueryOptions></QueryOptions>",
            CAMLRowLimit: 0,
            filterType: "BeginsWith",
            highlightClass: "",
            uniqueVals: false,
            maxHeight: 99999,
            processingIndicator: "_layouts/images/REFRESH.GIF"
        };
        var aL;
        //var aH = $(aJ.columnName).find("input[Title^='" + aJ.columnName + "']");
		var aH = $("body").find("input[Title^='" + aJ.columnName + "']");
        aH.css("position", "");
        var aK = aH.css("color");
        var aN = aH.css("width");
        if (aH.html() === null && aJ.debug) {
            X("SPServices.SPAutocomplete", "columnName: " + aJ.columnName, "Column is not an input control or is not found on page");
            return
        }
        aH.closest("span").find("br").remove();
        aH.wrap("<div>");
        var i = "Vendors_TypeAhead";
        aH.after("<div><ul id='" + i + "' style='width:" + aN + ";display:none;padding:2px;border:1px solid #2A1FAA;background-color:#FFF;position:absolute;z-index:40;margin:0'></div>");
        var aM = $("#" + i);
        aM.css("width", aN);
        $(aH).keyup(function() {
            var aW = $(this).val();
            aM.hide();
            if (aW.length < aJ.numChars) {
                return false
            }
            aH.css({
                "background-image": "url(" + aJ.processingIndicator + ")",
                "background-position": "right",
                "background-repeat": "no-repeat"
            });
            var aV = [];
            var aO = "<Query><OrderBy><FieldRef Name='" + aJ.sourceColumn + "'/></OrderBy><Where>";
            if (aJ.CAMLQuery.length > 0) {
                aO += "<And>"
            }
            aO += "<" + aJ.filterType + "><FieldRef Name='" + aJ.sourceColumn + "'/><Value Type='Text'>" + aW + "</Value></" + aJ.filterType + ">";
            if (aJ.CAMLQuery.length > 0) {
                aO += aJ.CAMLQuery + "</And>"
            }
            aO += "</Where></Query>";
            $().SPServices({
                operation: "GetListItems",
                async: false,
                webURL: aJ.WebURL,
                listName: aJ.sourceList,
                CAMLQuery: aO,
                CAMLQueryOptions: aJ.CAMLQueryOptions,
                CAMLViewFields: "<ViewFields><FieldRef Name='" + aJ.sourceColumn + "' /><FieldRef Name='Title'/><FieldRef Name='Country'/><FieldRef Name='Address'/><FieldRef Name='City'/><FieldRef Name='State'/></ViewFields>",
                CAMLRowLimit: aJ.CAMLRowLimit,
                completefunc: function(aZ) {
                    var aY = aJ.ignoreCase ? aW.toUpperCase() : aW;
                    $(aZ.responseXML).SPFilterNode("z:row").each(function() {
                        var a1 = $(this).attr("ows_" + aJ.sourceColumn);
                        var a2 = aJ.ignoreCase ? $(this).attr("ows_" + aJ.sourceColumn).toUpperCase() : $(this).attr("ows_" + aJ.sourceColumn);
                        if (aJ.filterType === "Contains") {
                            var a0 = a2.indexOf(aY);
                            if ((a0 >= 0) && (!aJ.uniqueVals || (ao.inArray(a1, aV) === -1))) {
                                aV.push($(this).attr("ows_" + aJ.sourceColumn) + " " + $(this).attr("ows_Title") + ";" + $(this).attr("ows_" + aJ.sourceColumn) + ";" + $(this).attr("ows_Address") + ";" + $(this).attr("ows_City") + ", " + $(this).attr("ows_State") + ";" + $(this).attr("ows_Country") + ";" + $(this).attr("ows_Title"));
                            }
                        } else {
                            if (aY === a2.substr(0, aY.length) && (!aJ.uniqueVals || (ao.inArray(a1, aV) === -1))) {
                                aV.push($(this).attr("ows_" + aJ.sourceColumn) + " " + $(this).attr("ows_Title") + ";" + $(this).attr("ows_" + aJ.sourceColumn) + ";" + $(this).attr("ows_Address") + ";" + $(this).attr("ows_City") + ", " + $(this).attr("ows_State") + ";" + $(this).attr("ows_Country") + ";" + $(this).attr("ows_Title"));
                            }
                        }
                    })
					console.log(vendorObj);
                }
            });
            var aR = "";
            for (O = 0; O < aV.length; O++) {
                if (aJ.highlightClass.length > 0) {
                    var aQ = new RegExp(aW, aJ.ignoreCase ? "gi" : "g");
                    var aT = aV[O].match(aQ);
                    var aS = 0;
                    for (aL = 0; aL < aT.length; aL++) {
                        var aU = aV[O].indexOf(aT[aL], aS);
                        var aP = aU + aT[aL].length;
                        var aX = "<span class='" + aJ.highlightClass + "'>" + aT[aL] + "</span>";
                        aV[O] = aV[O].substr(0, aU) + aX + aV[O].substr(aP);
                        aS = aU + aX.length
                    }
                }
							
                aR += "<li style='display: block;position: relative;cursor: pointer;' data-value='" + aV[O] + "'>" + aV[O].substr(0, aV[O].indexOf(";")) + "</li>"
            }
			
            aM.html(aR);
            $("#" + i + " li").click(function() {
                $("#" + i).fadeOut(aJ.slideUpSpeed);
				
				var dispListItem = $(this).data('value');
				dispListItem = dispListItem.substr(dispListItem.indexOf(";") + 1, dispListItem.length);
                
				$("body").find($("textarea[title='Ship To']")).val(dispListItem.split(";").join("\n"));
				aH.val($(this).text());
				
            }).mouseover(function() {
                var aY = {
                    cursor: "hand",
                    color: "#ffffff",
                    background: "#3399ff"
                };
                $(this).css(aY)
            }).mouseout(function() {
                var aY = {
                    cursor: "inherit",
                    color: aK,
                    background: "transparent"
                };
                $(this).css(aY)
            });
            if (aV.length > 0) {
                $("#" + i).slideDown(aJ.slideDownSpeed)
            }
            aH.css("background-image", "")
        })
		
		return vendorObj;
    };
    </script>