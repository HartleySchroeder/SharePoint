<script language="javascript" src="../../SiteAssets/CommonJS/jquery.min.js" type="text/javascript"></script>
<script language="javascript" src="../../SiteAssets/ShippingForms/CommonJS.js" type="text/javascript"></script>

<div style="width:400px">
	<table id="table_id">
	</table>
</div>

<script type="text/javascript">
	$(document).ready(function () {	
		var ddlConentType = $("select[title='Content Type'");
		ddlConentType.closest('tr').hide();
		var ddlContentTypeSel = ddlConentType.find("option:selected").text();

		var docName = $("input[title='Name Required Field']");
		docName.prop("disabled", true);

		var fromCompany = $("input[title='From Company']");
		fromCompany.closest('tr').hide();

		var fromOrigin = $("input[title='From Origin']");
		fromOrigin.closest('tr').hide();
		
		var head = document.getElementsByTagName('head')[0];
		var js = document.createElement("script");
		
		var loadTable = document.getElementById("table_id");
		var tHeadRow = document.createElement("thead");
		var headRow = document.createElement("tr");
		var head0 = document.createElement("th");

		var btnAdd = "<input id='btnAddRow' type='button' value = 'Additional Data' onclick = 'AddDetail();'>"
		$(".ms-formtoolbar > tbody > tr").append(btnAdd);
		
		if(ddlContentTypeSel == "ShippingAdvice")
		{
			js.src = "../../SiteAssets/ShippingForms/ShippingAdvice.js";
			
			var fromPhone = $("input[title='From Phone']");
			fromPhone.closest('tr').hide();

			var head1 = document.createElement("th");
			head1.innerHTML = "Our PO Number";
			var head2 = document.createElement("th");
			head2.innerHTML = "Your Invoice Number";
			var head3 = document.createElement("th");
			head3.innerHTML = "Quantity Returned";
			var head4 = document.createElement("th");
			head4.innerHTML = "Description";

			loadTable.appendChild(tHeadRow);
			tHeadRow.appendChild(headRow);
			headRow.appendChild(head0);
			headRow.appendChild(head1);
			headRow.appendChild(head2);
			headRow.appendChild(head3);
			headRow.appendChild(head4);
		}
		else if(ddlContentTypeSel == "BillOfLading")
		{
			js.src = "../../SiteAssets/ShippingForms/BillOfLading.js";
			
			var fromStreet = $("input[title='From Street']");
			fromStreet.closest('tr').hide();

			var head1 = document.createElement("th");
			head1.innerHTML = "No. of Units";
			var head2 = document.createElement("th");
			head2.innerHTML = "DG";
			var head3 = document.createElement("th");
			head3.innerHTML = "Description";
			var head4 = document.createElement("th");
			head4.innerHTML = "Total Quantity";
			var head5 = document.createElement("th");
			head5.innerHTML = "Weight";
			var head6 = document.createElement("th");
			head6.innerHTML = "Rate";
			var head7 = document.createElement("th");
			head7.innerHTML = "Charges";

			loadTable.appendChild(tHeadRow);
			tHeadRow.appendChild(headRow);
			headRow.appendChild(head0);
			headRow.appendChild(head1);
			headRow.appendChild(head2);
			headRow.appendChild(head3);
			headRow.appendChild(head4);
			headRow.appendChild(head5);
			headRow.appendChild(head6);
			headRow.appendChild(head7);
		}
		head.appendChild(js);

		var libUrl = _spPageContextInfo.serverRequestPath.substr(0, _spPageContextInfo.serverRequestPath.indexOf("/Forms/"));
		var listName = libUrl.substr(libUrl.lastIndexOf("/") + 1, libUrl.length);
		listName = listName.substr(0,3);

		$.ajax({
			url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Document Numbers')/items?$select=From_x0020_Company,From_x0020_Origin,From_x0020_Phone,From_x0020_Street&$filter=(Department eq '" + listName + "') and (Form_x0020_Type eq 'SA')",
			method: "GET",
			headers: { "Accept": "application/json; odata=verbose" },
			success: function (data) {
				if(ddlContentTypeSel == "ShippingAdvice")
				{
					$("input[title='From Phone']").val(data.d.results[0].From_x0020_Phone);
				}
				else if(ddlContentTypeSel == "BillOfLading")
				{
					$("input[title='From Street']").val(data.d.results[0].From_x0020_Street);
				}
				$("input[title='From Company']").val(data.d.results[0].From_x0020_Company);
				$("input[title='From Origin']").val(data.d.results[0].From_x0020_Origin);
			}
		});
	});
</script>