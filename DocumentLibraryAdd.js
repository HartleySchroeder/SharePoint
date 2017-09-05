<script language="javascript" src="../SiteAssets/CommonJS/jquery.min.js" type="text/javascript"></script>

<button onclick="createNewDocument('Shipping Advice');return false;">New Shipping Advice Allan Form</button>
<button onclick="createNewDocument('Bill of Lading');return false;">New Bill of Lading Allan Form</button>

<script type="text/javascript">

function createNewDocument(DocType) {

	var ctx = SP.ClientContext.get_current();
	var web = ctx.get_web();
	var list = web.get_lists().getById("7ADAD7EF-82D4-4417-A38C-2982367A5862");
	var folder = list.get_rootFolder();
	
	if (DocType == 'Shipping Advice')
	{
		var templateUrl = '/sites/itdev/solvera/AllanFormsLib/Forms/AllanForms/template.docx';
	}
	else if (DocType == 'Bill of Lading')
	{
		var templateUrl = '/sites/itdev/solvera/AllanFormsLib/Forms/BillOfLading/Bill-Of-Lading.docx';
	}
	var docName;
	var docNum;
	var docItem;
	var docFile;
	
	$.ajax({
		url: "https://potashcorp.sharepoint.com/sites/itdev/solvera/_api/web/lists/GetByTitle('Document_Numbers')/items?$select=ID,Department,Form_Type,Document_Num&$filter=(Department eq 'ALN') and (Form_Type eq '" + DocType + "')",
		method: "GET",
		headers: { "Accept": "application/json; odata=verbose" },
		success: function (data) {

			if (data.d.results.length == 1) {
				docNum = data.d.results[0].Document_Num
				if (DocType == 'Shipping Advice')
				{
					docName = "Shipping Advice - " + data.d.results[0].Department + " " + data.d.results[0].Document_Num + ".docx";
				}
				else if (DocType == 'Bill of Lading')
				{
					docName = "Bill of Lading - " + data.d.results[0].Department + " " + data.d.results[0].Document_Num + ".docx";
				}
				
			}
			docNum = docNum + 1;
			var item = {
				"__metadata": { "type": "SP.Data.Document_x005f_NumbersListItem" },
				"Document_Num": docNum
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
		setTimeout(function(){GoToPage(String.format("{0}?ID={1}&Source={2}", list.get_defaultEditFormUrl(), docItem.get_id(), "https://potashcorp.sharepoint.com/sites/itdev/solvera/AllanFormsLib/Forms/AllItems.aspx"))}, 3000);
	}
}
</script>