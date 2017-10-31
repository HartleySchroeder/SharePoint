<script language="javascript" src="../../SiteAssets/CommonJS/jquery.min.js" type="text/javascript"></script>

<button onclick="createNewDocument('SA');return false;">New Shipping Advice Form</button>
<button onclick="createNewDocument('BL');return false;">New Bill of Lading Form</button>

<script type="text/javascript">

function createNewDocument(DocType) {
	var waitUI = SP.UI.ModalDialog.showWaitScreenWithNoClose('Creating Document...', "Please wait, this shouldn't take long...", 100, 380);
	var ctx = SP.ClientContext.get_current();
	var web = ctx.get_web();
	var list = web.get_lists().getById(_spPageContextInfo.pageListId);
	var folder = list.get_rootFolder();
	var libUrl = _spPageContextInfo.serverRequestPath.substr(0, _spPageContextInfo.serverRequestPath.indexOf("/Forms/"));
	var listName = libUrl.substr(libUrl.lastIndexOf("/") + 1, libUrl.length);
	var listURL = _spPageContextInfo.webAbsoluteUrl + "/" + listName;
	listName = listName.substr(0,3);
	
	if (DocType == 'SA')
	{
		var templateUrl = libUrl + '/Forms/ShippingAdvice/Shipping_Advice.docx';
	}
	else if (DocType == 'BL')
	{
		var templateUrl = libUrl + '/Forms/BillOfLading/Bill_Of_Lading.docx';
	}
	var docName;
	var docNum;
	var docItem;
	var docFile;

	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Document Numbers')/items?$select=ID,Department,Form_x0020_Type,Number&$filter=(Department eq '" + listName + "') and (Form_x0020_Type eq '" + DocType + "')",
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
					waitUI.close();
				},
				error: function (data) {
					waitUI.close();
					alert("There was an error. Please contact your administrator.");
					console.log(data);
				}
			});
		},
		error: function (data) {
			waitUI.close();
			alert("There was an error. Please contact your administrator.");
			console.log(data);
		}
	});

	function onCreateSuccess() {
		GoToPage(String.format("{0}?ID={1}&Source={2}", list.get_defaultEditFormUrl(), docItem.get_id(), listURL));
	}
}

</script>