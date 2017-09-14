<script language="javascript" src="../../SiteAssets/CommonJS/jquery.min.js" type="text/javascript"></script>
<script language="javascript" src="../../SiteAssets/AllanForms/CommonJS.js" type="text/javascript"></script>

<div style="width:400px">
	<table id="table_id">
	</table>
</div>

<script type="text/javascript">
	$(document).ready(function () {	
		var ddlConentType = $("select[title='Content Type'");
		ddlConentType.closest('tr').hide();
		var ddlContentTypeSel = ddlConentType.find("option:selected").text();
		
		var formType = $("input[title='Form Type'");
		formType.closest('tr').hide();
		
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
			js.src = "../../SiteAssets/AllanForms/ShippingAdvice.js";
			
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
			js.src = "../../SiteAssets/AllanForms/BillOfLading.js";
			
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
	});
</script>