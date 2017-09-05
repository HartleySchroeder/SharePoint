<script language="javascript" src="../SiteAssets/JS/jquery.min.js" type="text/javascript"></script>
<script language="javascript" src="../SiteAssets/JS/jquery.SPServices-2014.02.min.js" type="text/javascript"></script>

<input title='Document Number' type='text'>
<button onclick="testSave();return false;">Click me</button>

<script type="text/javascript">
    $(document).ready(function () {
		 
    });
	
	var siteUrl = '/uat';

	function testSave() {
		var docNum = $('input[title="Document Number"]').val();
		
		CreateNewItem(docNum);
		return false;
	}
	
	function CreateNewItem(docNum) {
		//var templateString = '/uat/TestDocumentLib/Forms/TestDocumentTemplate/Testing.docx';
		var templateString = '/uat/TestDocLibTemplates/Testing.docx';
		var newDocString = 'TestDocumentLib/' + docNum + '.docx'; //make the filename based on the logged in user (checkout as well?).  Need a delete of the document if the user cancels..

		copyTo(templateString,newDocString); 
	}
	
	function copyTo(sourceFileUrl,targetFileUrl) {

		var endpointUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + sourceFileUrl + "')/copyto(strnewurl='" + targetFileUrl + "',boverwrite=true)"; 

		//var lastItem="";
		$.ajax({
				url: endpointUrl,
				method: "POST",
				contentType: "application/json;odata=verbose",
				headers: {
					"Accept": "application/json;odata=verbose",
					"X-RequestDigest": $("#__REQUESTDIGEST").val()
					},
				complete: function(data) {
						//console.log(data);
						//alert('h');
						
						$().SPServices({
							operation: "GetListItems",
							listName: "TestDocumentLib",
							async: false,
							CAMLViewFields: "<ViewFields><FieldRef Name='ID' /></ViewFields>",
							CAMLQuery: "<Query><OrderBy><FieldRef Name='ID' Ascending='false' /></OrderBy></Query>", //query for the filename created based on the user.
							CAMLRowLimit: 1,
							completefunc: function(xData,Status) { 
								//var lastItem = $(xDatass.responseXML).find("z\\:row");
								$(xData.responseXML).SPFilterNode("z:row").each(function() {
									var lastItem = $(this).attr("ows_ID");
									window.location.href = "https://solveit.solvera.ca/uat/_layouts/15/start.aspx#/TestDocumentLib/Forms/TestInsert.aspx?ID=" + lastItem;
								});
							 } 
						});
						
						//
					}
		});
		
		
					
					
	}  
	
	


</script>