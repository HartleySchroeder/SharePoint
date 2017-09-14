<script language="javascript" src="../SiteAssets/CommonJS/jquery.min.js" type="text/javascript"></script>

<button onclick="createNewDocument('SA');return false;">New Shipping Advice Allan Form</button>
<button onclick="createNewDocument('BL');return false;">New Bill of Lading Allan Form</button>

<script type="text/javascript">

function createNewDocument(DocType) {

	var ctx = SP.ClientContext.get_current();
	var web = ctx.get_web();
	var list = web.get_lists().getByTitle("AllanFormsLib");
	var folder = list.get_rootFolder();
	
	if (DocType == 'SA')
	{
		var templateUrl = '/sites/forms/Shipping/AllanFormsLib/Forms/ShippingAdvice/ShippingAdvice.docx';
	}
	else if (DocType == 'BL')
	{
		var templateUrl = '/sites/forms/Shipping/AllanFormsLib/Forms/BillOfLading/Bill_Of_Lading.docx';
	}
	var docName;
	var docNum;
	var docItem;
	var docFile;
	
	$.ajax({
		url: "https://potashcorp.sharepoint.com/sites/forms/Shipping/_api/web/lists/GetByTitle('Document Numbers')/items?$select=ID,Department,Form_x0020_Type,Number&$filter=(Department eq 'ALN') and (Form_x0020_Type eq '" + DocType + "')",
		method: "GET",
		headers: { "Accept": "application/json; odata=verbose" },
		success: function (data) {

			if (data.d.results.length == 1) {
				docNum = data.d.results[0].Number;
				docName = data.d.results[0].Department + "-" + data.d.results[0].Form_x0020_Type + "-" + data.d.results[0].Number + ".docx";
			}
			docNum = docNum + 1;
			var item = {
				"__metadata": { "type": "SP.Data.Document_x0020_NumbersListItem" },
				"Number": docNum
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
					docItem = list.createDocumentFromTemplate(docName, folder, templateUrl);
					docFile = docItem.get_file();
					ctx.load(list, "DefaultEditFormUrl");
					ctx.load(docItem, "Id");
					ctx.load(docFile, "ServerRelativeUrl", "CheckOutType");
					ctx.executeQueryAsync(onCreateSuccess, onFail);
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
	
	function onCreateSuccess() {
		setTimeout(function(){GoToPage(String.format("{0}?ID={1}&Source={2}", list.get_defaultEditFormUrl(), docItem.get_id(), "https://potashcorp.sharepoint.com/sites/forms/Shipping/AllanFormsLib/Forms/AllItems.aspx"))}, 3000);
	}
}
</script>