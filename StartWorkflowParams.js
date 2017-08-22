<<<<<<< HEAD
function startWorkflow() {
 
                console.log('workflow: ' + params.workflowName + ' started on item: ' + params.itemID + ' at ' + Date.now() );
                params.after = params.after || (function() {});
                if (!params.workflowName) { alert("Please provide the workflow name!"); return; }
 
 
                var context = SP.ClientContext.get_current();
               
                dlg = null;   
                showInProgressDialog("Retrieving Workflow Information");
 
               
               SubmitWorkflow();
}
function startExchangeWorkflow() {
 
                console.log('workflow: ' + params.workflowName + ' started on item: ' + params.itemID + ' at ' + Date.now() );
                params.after = params.after || (function() {});
                if (!params.workflowName) { alert("Please provide the workflow name!"); return; }
 
 
                var context = SP.ClientContext.get_current();
               
                dlg = null;   
                showInProgressDialog("Retrieving Workflow Information");
 
               
               SubmitExchangeWorkflow();
}
 
 
function SubmitWorkflow() {
               
                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Selecting Workflow");
                console.log( 'finding workflow at ' + Date.now());
//            https://potashcorp.sharepoint.com/sites/forms/Lists/test%20leave
    var url = 'https://' + window.location.hostname + '/sites/forms/Lists/Request/' + params.itemID + '_.000';
 
                console.log("Item URL: " + url);
                               
                var WFID = params.itemID;
                    //console.log('Workflow ID: ' + WFID.toString());
                var templateId = '{91640DAD-219A-47F4-B384-E97F9BE0A760}';
                console.log("Item URL: " + templateId);
 
                var workflowParameters = "<root />";
                var ManagerName = '';
                var SecondManager = '';
                if(Designate.Name == '')
                {
                                ManagerName = Approver.Email;
                }
                else
                {
                                ManagerName = Designate.Email;
                }
                if(SecondDesignate.Name == '')
                {
                                SecondManager = SecondApprover.Email;
                }
                else
                {
                                SecondManager = SecondDesignate.Email;
                }
                var HRName='';
                if(typeof HRContact == "undefined")
                {
                                HRName = 'rocanville.hrforms@potashcorp.com';
                }
                else
                {
                                HRName = HRContact;
                }
                                                workflowParameters ='<dfs:myFields xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:dms="http://schemas.microsoft.com/office/2009/documentManagement/types" xmlns:dfs="http://schemas.microsoft.com/office/infopath/2003/dataFormSolution" xmlns:q="http://schemas.microsoft.com/office/infopath/2009/WSSList/queryFields" xmlns:d="http://schemas.microsoft.com/office/infopath/2009/WSSList/dataFields" xmlns:ma="http://schemas.microsoft.com/office/2009/metadata/properties/metaAttributes" xmlns:pc="http://schemas.microsoft.com/office/infopath/2007/PartnerControls" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
                                                workflowParameters +='<dfs:queryFields></dfs:queryFields>';
                                                workflowParameters +='<dfs:dataFields>';
                                                workflowParameters +='<d:SharePointListItem_RW>';
                                                workflowParameters += '<d:Approvers>';
                                                workflowParameters +=                '<d:Assignment>' ;
                                                workflowParameters +=                                '<d:Assignee>';
                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Manager<pc:AccountId>'+ManagerName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                workflowParameters +=                                '</d:Assignee>';
                                                workflowParameters +=               '<d:Stage>0</d:Stage>';
                                                workflowParameters +=                                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                workflowParameters +=                '</d:Assignment>';
                                                if(Requestor.Employment == 'Hourly')
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Second Manager<pc:AccountId>'+SecondManager+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>1</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>2</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
 
                                                }
                                                else
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>1</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                }
                                                workflowParameters += '</d:Approvers>';
                                                workflowParameters += '<d:ExpandGroups>true</d:ExpandGroups>';
                                                workflowParameters += '<d:NotificationMessage>Please approve</d:NotificationMessage>';
                                                workflowParameters += '<d:DueDateforAllTasks xsi:nil="true" />' ;
                                                workflowParameters += '<d:DurationforSerialTasks>5</d:DurationforSerialTasks>';
                                                workflowParameters += '<d:DurationUnits>Day</d:DurationUnits>';
                                                workflowParameters += '<d:CC />';
                                                workflowParameters += '<d:CancelonRejection>true</d:CancelonRejection>';
                                                workflowParameters += '<d:CancelonChange>true</d:CancelonChange>';
                                                workflowParameters += '<d:EnableContentApproval>false</d:EnableContentApproval>';
                                                workflowParameters += '</d:SharePointListItem_RW>';
                                                workflowParameters += '</dfs:dataFields>';
                                                workflowParameters += '</dfs:myFields>';
                                                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Initiating Workflow " + params.workflowName + " on new item " + params.itemID);
                console.log('starting worfkow at '  + Date.now());             
               
                var x = jQuery().SPServices({
                               operation:"StartWorkflow",
                               async:true,
                               item:url,
                               templateId:templateId,
                               workflowParameters:workflowParameters,
                               completefunc:params.after
                               });
    if(x.status == 500)
    {
                console.log(x.statusText + ' - ' + x.responseText);
    }
    else
    {
                console.log('workflow submitted');
 
                                if(typeof URLSource == "undefined")
                                {
                                                console.log('Complete worfkow at '  + Date.now());
                                                window.location = "https://potashcorp.sharepoint.com/sites/forms/SitePages/Home.aspx";
                                }
                                else
                                {
                                                window.location = decodeURIComponent(URLSource);
                                }
    }
               
                closeInProgressDialog();
}
 
 
function SubmitExchangeWorkflow() {
               
                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Selecting Workflow");
                console.log( 'finding workflow at ' + Date.now());
//            https://potashcorp.sharepoint.com/sites/forms/Lists/test%20leave
    var url = 'https://' + window.location.hostname + '/sites/forms/Lists/Request/' + params.itemID + '_.000';
 
                console.log("Item URL: " + url);
                               
                var WFID = params.itemID;
                    //console.log('Workflow ID: ' + WFID.toString());
                var templateId = '{91640DAD-219A-47F4-B384-E97F9BE0A760}';
                console.log("Item URL: " + templateId);
 
                var workflowParameters = "<root />";
                var ManagerName = '';
                var SecondManager = '';
                var AlternateApprover = '';
                var SecondAlternateApprover = '';
                if(Designate.Name == '')
                {
                                ManagerName = Approver.Email;
                }
                else
                {
                                ManagerName = Designate.Email;
                }
                if(SecondDesignate.Name == '')
                {
                                SecondManager = SecondApprover.Email;
                }
                else
                {
                                SecondManager = SecondDesignate.Email;
                }
                if(AlternateDesignate.Name == '')
                {
                                AlternateApprover = AlternateApprover.Email;
                }
                else
                {
                                AlternateApprover = AlternateDesignate.Email;
                }
                if(AlternateSecondDesignate.Name == '')
                {
                                SecondAlternateApprover = AlternateSecondApprover.Email;
                }
                else
                {
                                SecondAlternateApprover = AlternateSecondDesignate.Email;
                }
 
                var HRName='';
                if(typeof HRContact == "undefined")
                {
                                HRName = 'rocanville.hrforms@potashcorp.com';
                }
                else
                {
                                HRName = HRContact;
                }
 
                                                workflowParameters ='<dfs:myFields xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:dms="http://schemas.microsoft.com/office/2009/documentManagement/types" xmlns:dfs="http://schemas.microsoft.com/office/infopath/2003/dataFormSolution" xmlns:q="http://schemas.microsoft.com/office/infopath/2009/WSSList/queryFields" xmlns:d="http://schemas.microsoft.com/office/infopath/2009/WSSList/dataFields" xmlns:ma="http://schemas.microsoft.com/office/2009/metadata/properties/metaAttributes" xmlns:pc="http://schemas.microsoft.com/office/infopath/2007/PartnerControls" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
                                                workflowParameters +='<dfs:queryFields></dfs:queryFields>';
                                                workflowParameters +='<dfs:dataFields>';
                                                workflowParameters +='<d:SharePointListItem_RW>';
                                                workflowParameters += '<d:Approvers>';
                                                workflowParameters +=                '<d:Assignment>' ;
                                                workflowParameters +=                                '<d:Assignee>';
                                                workflowParameters +=                                                '<pc:Person><pc:DisplayName></pc:DisplayName>Alternate Employee<pc:AccountId>'+Alternate.Email+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                workflowParameters +=                                '</d:Assignee>';
                                                workflowParameters +=               '<d:Stage>0</d:Stage>';
                                                workflowParameters +=                                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                workflowParameters +=                '</d:Assignment>';
                                                workflowParameters +=                '<d:Assignment>' ;
                                                workflowParameters +=                                '<d:Assignee>';
                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Manager<pc:AccountId>'+ManagerName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                workflowParameters +=                                '</d:Assignee>';
                                                workflowParameters +=               '<d:Stage>1</d:Stage>';
                                                workflowParameters +=                                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                workflowParameters +=                '</d:Assignment>';
                                                if(Requestor.Employment == 'Hourly')
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Second Manager<pc:AccountId>'+SecondManager+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>2</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Alternate Approver<pc:AccountId>'+AlternateApprover+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>3</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Manager of Alternate Approver<pc:AccountId>'+SecondAlternateApprover+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>4</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>5</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
 
                                                }
                                                else
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Alternate Approver<pc:AccountId>'+AlternateApprover+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>2</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>3</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
 
                                                }
                                                workflowParameters += '</d:Approvers>';
                                                workflowParameters += '<d:ExpandGroups>true</d:ExpandGroups>';
                                                workflowParameters += '<d:NotificationMessage>Please approve</d:NotificationMessage>';
                                                workflowParameters += '<d:DueDateforAllTasks xsi:nil="true" />' ;
                                                workflowParameters += '<d:DurationforSerialTasks>5</d:DurationforSerialTasks>';
                                                workflowParameters += '<d:DurationUnits>Day</d:DurationUnits>';
                                                workflowParameters += '<d:CC />';
                                                workflowParameters += '<d:CancelonRejection>true</d:CancelonRejection>';
                                                workflowParameters += '<d:CancelonChange>true</d:CancelonChange>';
                                                workflowParameters += '<d:EnableContentApproval>false</d:EnableContentApproval>';
                                                workflowParameters += '</d:SharePointListItem_RW>';
                                                workflowParameters += '</dfs:dataFields>';
                                                workflowParameters += '</dfs:myFields>';
                                                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Initiating Workflow " + params.workflowName + " on new item " + params.itemID);
                console.log('starting worfkow at '  + Date.now());
                var x = jQuery().SPServices({
                               operation:"StartWorkflow",
                               async:true,
                               item:url,
                               templateId:templateId,
                               workflowParameters:workflowParameters,
                               completefunc:params.after
                               });
    if(x.status == 500)
    {
                console.log(x.statusText + ' - ' + x.responseText);
    }
    else
    {
                console.log('workflow submitted');
 
                                if(URLSource == null)
                                {
                                                console.log('Complete worfkow at '  + Date.now());
                                                alert('done');
                                                window.location = "https://potashcorp.sharepoint.com/sites/forms/SitePages/Home.aspx";
                                }
                                else
                                {
                                                window.location = decodeURIComponent(URLSource);
                                }
    }
               
                closeInProgressDialog();
}
 
 
 
function onWorkflowSucceeded() {
    var enumerator = workflows.getEnumerator();
               
                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Selecting Workflow");
                console.log( 'finding workflow at ' + Date.now());
    while (enumerator.moveNext()) {
                    var workflow = enumerator.get_current();
                    if (workflow.get_name() == params.workflowName) {
                                console.log("Item FileRef: " + item.get_item("FileRef"));
                               
                                    var url = 'https://' + window.location.hostname + item.get_item("FileRef");
                                    var WFID = workflow.get_id().toString();
                                    console.log('Workflow ID: ' + WFID.toString());
                                    var templateId = '{' + WFID.toString() + '}';
                                    var workflowParameters = "<root />";
                                                var ManagerName = '';
                                                var SecondManager = '';
                                                if(Designate.Name == '')
                                                {
                                                                ManagerName = Approver.Email;
                                                }
                                                else
                                                {
                                                                ManagerName = Designate.Email;
                                                }
                                                if(SecondDesignate.Name == '')
                                                {
                                                                SecondManager = SecondApprover.Email;
                                                }
                                                else
                                                {
                                                                SecondManager = SecondDesignate.Email;
                                                }
                                                var HRName = HRContact;
                                                workflowParameters ='<dfs:myFields xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:dms="http://schemas.microsoft.com/office/2009/documentManagement/types" xmlns:dfs="http://schemas.microsoft.com/office/infopath/2003/dataFormSolution" xmlns:q="http://schemas.microsoft.com/office/infopath/2009/WSSList/queryFields" xmlns:d="http://schemas.microsoft.com/office/infopath/2009/WSSList/dataFields" xmlns:ma="http://schemas.microsoft.com/office/2009/metadata/properties/metaAttributes" xmlns:pc="http://schemas.microsoft.com/office/infopath/2007/PartnerControls" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
                                                workflowParameters +='<dfs:queryFields></dfs:queryFields>';
                                                workflowParameters +='<dfs:dataFields>';
                                                workflowParameters +='<d:SharePointListItem_RW>';
                                                workflowParameters += '<d:Approvers>';
                                                workflowParameters +=                '<d:Assignment>' ;
                                                workflowParameters +=                                '<d:Assignee>';
                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Manager<pc:AccountId>'+ManagerName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                workflowParameters +=                                '</d:Assignee>';
                                                workflowParameters +=               '<d:Stage>0</d:Stage>';
                                                workflowParameters +=                                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                workflowParameters +=                '</d:Assignment>';
                                                if(Requestor.Employment == 'Hourly')
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Second Manager<pc:AccountId>'+SecondManager+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>1</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>2</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
 
                                                }
                                                else
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>1</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                }
                                                workflowParameters += '</d:Approvers>';
                                                workflowParameters += '<d:ExpandGroups>true</d:ExpandGroups>';
                                                workflowParameters += '<d:NotificationMessage>Please approve</d:NotificationMessage>';
                                                workflowParameters += '<d:DueDateforAllTasks xsi:nil="true" />' ;
                                                workflowParameters += '<d:DurationforSerialTasks>5</d:DurationforSerialTasks>';
                                                workflowParameters += '<d:DurationUnits>Day</d:DurationUnits>';
                                                workflowParameters += '<d:CC />';
                                                workflowParameters += '<d:CancelonRejection>true</d:CancelonRejection>';
                                                workflowParameters += '<d:CancelonChange>true</d:CancelonChange>';
                                                workflowParameters += '<d:EnableContentApproval>false</d:EnableContentApproval>';
                                                workflowParameters += '</d:SharePointListItem_RW>';
                                                workflowParameters += '</dfs:dataFields>';
                                                workflowParameters += '</dfs:myFields>';
                                                closeInProgressDialog();
 
                                                dlg = null;   
                                                showInProgressDialog("Initiating Workflow " + params.workflowName + " on new item " + params.itemID);
                                                console.log('starting worfkow at '  + Date.now());
                                                var x = jQuery().SPServices({
                               operation:"StartWorkflow",
                               async:false,
                               item:url,
                               templateId:templateId,
                               workflowParameters:workflowParameters,
                               completefunc:params.after
                               });
               if(x.status == 500)
               {
                               console.log(x.statusText + ' - ' + x.responseText);
               }
               else
               {
                               console.log('workflow submitted');
 
                               if(URLSource == null)
                               {
                                                                                console.log('Complete worfkow at '  + Date.now());
                                               alert('done');
                                                               window.location = "https://potashcorp.sharepoint.com/sites/forms/SitePages/Home.aspx";
                                               }
                                               else
                                               {
                                                               window.location = decodeURIComponent(URLSource);
                                               }
                        }
                        break;
                                }
                }
                closeInProgressDialog();
}
function onWorkflowFailed(sender, args)
{
                                dlg = null;
    console.log('Workflow Start failed. ' + args.get_message() + '\n' + args.get_stackTrace());
=======
function startWorkflow() {
 
                console.log('workflow: ' + params.workflowName + ' started on item: ' + params.itemID + ' at ' + Date.now() );
                params.after = params.after || (function() {});
                if (!params.workflowName) { alert("Please provide the workflow name!"); return; }
 
 
                var context = SP.ClientContext.get_current();
               
                dlg = null;   
                showInProgressDialog("Retrieving Workflow Information");
 
               
               SubmitWorkflow();
}
function startExchangeWorkflow() {
 
                console.log('workflow: ' + params.workflowName + ' started on item: ' + params.itemID + ' at ' + Date.now() );
                params.after = params.after || (function() {});
                if (!params.workflowName) { alert("Please provide the workflow name!"); return; }
 
 
                var context = SP.ClientContext.get_current();
               
                dlg = null;   
                showInProgressDialog("Retrieving Workflow Information");
 
               
               SubmitExchangeWorkflow();
}
 
 
function SubmitWorkflow() {
               
                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Selecting Workflow");
                console.log( 'finding workflow at ' + Date.now());
//            https://potashcorp.sharepoint.com/sites/forms/Lists/test%20leave
    var url = 'https://' + window.location.hostname + '/sites/forms/Lists/Request/' + params.itemID + '_.000';
 
                console.log("Item URL: " + url);
                               
                var WFID = params.itemID;
                    //console.log('Workflow ID: ' + WFID.toString());
                var templateId = '{91640DAD-219A-47F4-B384-E97F9BE0A760}';
                console.log("Item URL: " + templateId);
 
                var workflowParameters = "<root />";
                var ManagerName = '';
                var SecondManager = '';
                if(Designate.Name == '')
                {
                                ManagerName = Approver.Email;
                }
                else
                {
                                ManagerName = Designate.Email;
                }
                if(SecondDesignate.Name == '')
                {
                                SecondManager = SecondApprover.Email;
                }
                else
                {
                                SecondManager = SecondDesignate.Email;
                }
                var HRName='';
                if(typeof HRContact == "undefined")
                {
                                HRName = 'rocanville.hrforms@potashcorp.com';
                }
                else
                {
                                HRName = HRContact;
                }
                                                workflowParameters ='<dfs:myFields xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:dms="http://schemas.microsoft.com/office/2009/documentManagement/types" xmlns:dfs="http://schemas.microsoft.com/office/infopath/2003/dataFormSolution" xmlns:q="http://schemas.microsoft.com/office/infopath/2009/WSSList/queryFields" xmlns:d="http://schemas.microsoft.com/office/infopath/2009/WSSList/dataFields" xmlns:ma="http://schemas.microsoft.com/office/2009/metadata/properties/metaAttributes" xmlns:pc="http://schemas.microsoft.com/office/infopath/2007/PartnerControls" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
                                                workflowParameters +='<dfs:queryFields></dfs:queryFields>';
                                                workflowParameters +='<dfs:dataFields>';
                                                workflowParameters +='<d:SharePointListItem_RW>';
                                                workflowParameters += '<d:Approvers>';
                                                workflowParameters +=                '<d:Assignment>' ;
                                                workflowParameters +=                                '<d:Assignee>';
                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Manager<pc:AccountId>'+ManagerName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                workflowParameters +=                                '</d:Assignee>';
                                                workflowParameters +=               '<d:Stage>0</d:Stage>';
                                                workflowParameters +=                                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                workflowParameters +=                '</d:Assignment>';
                                                if(Requestor.Employment == 'Hourly')
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Second Manager<pc:AccountId>'+SecondManager+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>1</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>2</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
 
                                                }
                                                else
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>1</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                }
                                                workflowParameters += '</d:Approvers>';
                                                workflowParameters += '<d:ExpandGroups>true</d:ExpandGroups>';
                                                workflowParameters += '<d:NotificationMessage>Please approve</d:NotificationMessage>';
                                                workflowParameters += '<d:DueDateforAllTasks xsi:nil="true" />' ;
                                                workflowParameters += '<d:DurationforSerialTasks>5</d:DurationforSerialTasks>';
                                                workflowParameters += '<d:DurationUnits>Day</d:DurationUnits>';
                                                workflowParameters += '<d:CC />';
                                                workflowParameters += '<d:CancelonRejection>true</d:CancelonRejection>';
                                                workflowParameters += '<d:CancelonChange>true</d:CancelonChange>';
                                                workflowParameters += '<d:EnableContentApproval>false</d:EnableContentApproval>';
                                                workflowParameters += '</d:SharePointListItem_RW>';
                                                workflowParameters += '</dfs:dataFields>';
                                                workflowParameters += '</dfs:myFields>';
                                                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Initiating Workflow " + params.workflowName + " on new item " + params.itemID);
                console.log('starting worfkow at '  + Date.now());             
               
                var x = jQuery().SPServices({
                               operation:"StartWorkflow",
                               async:true,
                               item:url,
                               templateId:templateId,
                               workflowParameters:workflowParameters,
                               completefunc:params.after
                               });
    if(x.status == 500)
    {
                console.log(x.statusText + ' - ' + x.responseText);
    }
    else
    {
                console.log('workflow submitted');
 
                                if(typeof URLSource == "undefined")
                                {
                                                console.log('Complete worfkow at '  + Date.now());
                                                window.location = "https://potashcorp.sharepoint.com/sites/forms/SitePages/Home.aspx";
                                }
                                else
                                {
                                                window.location = decodeURIComponent(URLSource);
                                }
    }
               
                closeInProgressDialog();
}
 
 
function SubmitExchangeWorkflow() {
               
                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Selecting Workflow");
                console.log( 'finding workflow at ' + Date.now());
//            https://potashcorp.sharepoint.com/sites/forms/Lists/test%20leave
    var url = 'https://' + window.location.hostname + '/sites/forms/Lists/Request/' + params.itemID + '_.000';
 
                console.log("Item URL: " + url);
                               
                var WFID = params.itemID;
                    //console.log('Workflow ID: ' + WFID.toString());
                var templateId = '{91640DAD-219A-47F4-B384-E97F9BE0A760}';
                console.log("Item URL: " + templateId);
 
                var workflowParameters = "<root />";
                var ManagerName = '';
                var SecondManager = '';
                var AlternateApprover = '';
                var SecondAlternateApprover = '';
                if(Designate.Name == '')
                {
                                ManagerName = Approver.Email;
                }
                else
                {
                                ManagerName = Designate.Email;
                }
                if(SecondDesignate.Name == '')
                {
                                SecondManager = SecondApprover.Email;
                }
                else
                {
                                SecondManager = SecondDesignate.Email;
                }
                if(AlternateDesignate.Name == '')
                {
                                AlternateApprover = AlternateApprover.Email;
                }
                else
                {
                                AlternateApprover = AlternateDesignate.Email;
                }
                if(AlternateSecondDesignate.Name == '')
                {
                                SecondAlternateApprover = AlternateSecondApprover.Email;
                }
                else
                {
                                SecondAlternateApprover = AlternateSecondDesignate.Email;
                }
 
                var HRName='';
                if(typeof HRContact == "undefined")
                {
                                HRName = 'rocanville.hrforms@potashcorp.com';
                }
                else
                {
                                HRName = HRContact;
                }
 
                                                workflowParameters ='<dfs:myFields xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:dms="http://schemas.microsoft.com/office/2009/documentManagement/types" xmlns:dfs="http://schemas.microsoft.com/office/infopath/2003/dataFormSolution" xmlns:q="http://schemas.microsoft.com/office/infopath/2009/WSSList/queryFields" xmlns:d="http://schemas.microsoft.com/office/infopath/2009/WSSList/dataFields" xmlns:ma="http://schemas.microsoft.com/office/2009/metadata/properties/metaAttributes" xmlns:pc="http://schemas.microsoft.com/office/infopath/2007/PartnerControls" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
                                                workflowParameters +='<dfs:queryFields></dfs:queryFields>';
                                                workflowParameters +='<dfs:dataFields>';
                                                workflowParameters +='<d:SharePointListItem_RW>';
                                                workflowParameters += '<d:Approvers>';
                                                workflowParameters +=                '<d:Assignment>' ;
                                                workflowParameters +=                                '<d:Assignee>';
                                                workflowParameters +=                                                '<pc:Person><pc:DisplayName></pc:DisplayName>Alternate Employee<pc:AccountId>'+Alternate.Email+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                workflowParameters +=                                '</d:Assignee>';
                                                workflowParameters +=               '<d:Stage>0</d:Stage>';
                                                workflowParameters +=                                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                workflowParameters +=                '</d:Assignment>';
                                                workflowParameters +=                '<d:Assignment>' ;
                                                workflowParameters +=                                '<d:Assignee>';
                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Manager<pc:AccountId>'+ManagerName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                workflowParameters +=                                '</d:Assignee>';
                                                workflowParameters +=               '<d:Stage>1</d:Stage>';
                                                workflowParameters +=                                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                workflowParameters +=                '</d:Assignment>';
                                                if(Requestor.Employment == 'Hourly')
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Second Manager<pc:AccountId>'+SecondManager+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>2</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Alternate Approver<pc:AccountId>'+AlternateApprover+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>3</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Manager of Alternate Approver<pc:AccountId>'+SecondAlternateApprover+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>4</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>5</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
 
                                                }
                                                else
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Alternate Approver<pc:AccountId>'+AlternateApprover+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>2</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>3</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
 
                                                }
                                                workflowParameters += '</d:Approvers>';
                                                workflowParameters += '<d:ExpandGroups>true</d:ExpandGroups>';
                                                workflowParameters += '<d:NotificationMessage>Please approve</d:NotificationMessage>';
                                                workflowParameters += '<d:DueDateforAllTasks xsi:nil="true" />' ;
                                                workflowParameters += '<d:DurationforSerialTasks>5</d:DurationforSerialTasks>';
                                                workflowParameters += '<d:DurationUnits>Day</d:DurationUnits>';
                                                workflowParameters += '<d:CC />';
                                                workflowParameters += '<d:CancelonRejection>true</d:CancelonRejection>';
                                                workflowParameters += '<d:CancelonChange>true</d:CancelonChange>';
                                                workflowParameters += '<d:EnableContentApproval>false</d:EnableContentApproval>';
                                                workflowParameters += '</d:SharePointListItem_RW>';
                                                workflowParameters += '</dfs:dataFields>';
                                                workflowParameters += '</dfs:myFields>';
                                                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Initiating Workflow " + params.workflowName + " on new item " + params.itemID);
                console.log('starting worfkow at '  + Date.now());
                var x = jQuery().SPServices({
                               operation:"StartWorkflow",
                               async:true,
                               item:url,
                               templateId:templateId,
                               workflowParameters:workflowParameters,
                               completefunc:params.after
                               });
    if(x.status == 500)
    {
                console.log(x.statusText + ' - ' + x.responseText);
    }
    else
    {
                console.log('workflow submitted');
 
                                if(URLSource == null)
                                {
                                                console.log('Complete worfkow at '  + Date.now());
                                                alert('done');
                                                window.location = "https://potashcorp.sharepoint.com/sites/forms/SitePages/Home.aspx";
                                }
                                else
                                {
                                                window.location = decodeURIComponent(URLSource);
                                }
    }
               
                closeInProgressDialog();
}
 
 
 
function onWorkflowSucceeded() {
    var enumerator = workflows.getEnumerator();
               
                closeInProgressDialog();
 
                dlg = null;   
                showInProgressDialog("Selecting Workflow");
                console.log( 'finding workflow at ' + Date.now());
    while (enumerator.moveNext()) {
                    var workflow = enumerator.get_current();
                    if (workflow.get_name() == params.workflowName) {
                                console.log("Item FileRef: " + item.get_item("FileRef"));
                               
                                    var url = 'https://' + window.location.hostname + item.get_item("FileRef");
                                    var WFID = workflow.get_id().toString();
                                    console.log('Workflow ID: ' + WFID.toString());
                                    var templateId = '{' + WFID.toString() + '}';
                                    var workflowParameters = "<root />";
                                                var ManagerName = '';
                                                var SecondManager = '';
                                                if(Designate.Name == '')
                                                {
                                                                ManagerName = Approver.Email;
                                                }
                                                else
                                                {
                                                                ManagerName = Designate.Email;
                                                }
                                                if(SecondDesignate.Name == '')
                                                {
                                                                SecondManager = SecondApprover.Email;
                                                }
                                                else
                                                {
                                                                SecondManager = SecondDesignate.Email;
                                                }
                                                var HRName = HRContact;
                                                workflowParameters ='<dfs:myFields xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:dms="http://schemas.microsoft.com/office/2009/documentManagement/types" xmlns:dfs="http://schemas.microsoft.com/office/infopath/2003/dataFormSolution" xmlns:q="http://schemas.microsoft.com/office/infopath/2009/WSSList/queryFields" xmlns:d="http://schemas.microsoft.com/office/infopath/2009/WSSList/dataFields" xmlns:ma="http://schemas.microsoft.com/office/2009/metadata/properties/metaAttributes" xmlns:pc="http://schemas.microsoft.com/office/infopath/2007/PartnerControls" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
                                                workflowParameters +='<dfs:queryFields></dfs:queryFields>';
                                                workflowParameters +='<dfs:dataFields>';
                                                workflowParameters +='<d:SharePointListItem_RW>';
                                                workflowParameters += '<d:Approvers>';
                                                workflowParameters +=                '<d:Assignment>' ;
                                                workflowParameters +=                                '<d:Assignee>';
                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Manager<pc:AccountId>'+ManagerName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                workflowParameters +=                                '</d:Assignee>';
                                                workflowParameters +=               '<d:Stage>0</d:Stage>';
                                                workflowParameters +=                                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                workflowParameters +=                '</d:Assignment>';
                                                if(Requestor.Employment == 'Hourly')
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Second Manager<pc:AccountId>'+SecondManager+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>1</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>2</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
 
                                                }
                                                else
                                                {
                                                                workflowParameters += '<d:Assignment>' ;
                                                                workflowParameters +=                '<d:Assignee>';
                                                                workflowParameters +=                                '<pc:Person><pc:DisplayName></pc:DisplayName>Human Resources<pc:AccountId>'+HRName+'</pc:AccountId><pc:AccountType>User</pc:AccountType></pc:Person>';
                                                                workflowParameters +=                '</d:Assignee>';
                                                                workflowParameters +=                          '<d:Stage>1</d:Stage>';
                                                                workflowParameters +=                '<d:AssignmentType>Serial</d:AssignmentType>';
                                                                workflowParameters += '</d:Assignment>';
                                                }
                                                workflowParameters += '</d:Approvers>';
                                                workflowParameters += '<d:ExpandGroups>true</d:ExpandGroups>';
                                                workflowParameters += '<d:NotificationMessage>Please approve</d:NotificationMessage>';
                                                workflowParameters += '<d:DueDateforAllTasks xsi:nil="true" />' ;
                                                workflowParameters += '<d:DurationforSerialTasks>5</d:DurationforSerialTasks>';
                                                workflowParameters += '<d:DurationUnits>Day</d:DurationUnits>';
                                                workflowParameters += '<d:CC />';
                                                workflowParameters += '<d:CancelonRejection>true</d:CancelonRejection>';
                                                workflowParameters += '<d:CancelonChange>true</d:CancelonChange>';
                                                workflowParameters += '<d:EnableContentApproval>false</d:EnableContentApproval>';
                                                workflowParameters += '</d:SharePointListItem_RW>';
                                                workflowParameters += '</dfs:dataFields>';
                                                workflowParameters += '</dfs:myFields>';
                                                closeInProgressDialog();
 
                                                dlg = null;   
                                                showInProgressDialog("Initiating Workflow " + params.workflowName + " on new item " + params.itemID);
                                                console.log('starting worfkow at '  + Date.now());
                                                var x = jQuery().SPServices({
                               operation:"StartWorkflow",
                               async:false,
                               item:url,
                               templateId:templateId,
                               workflowParameters:workflowParameters,
                               completefunc:params.after
                               });
               if(x.status == 500)
               {
                               console.log(x.statusText + ' - ' + x.responseText);
               }
               else
               {
                               console.log('workflow submitted');
 
                               if(URLSource == null)
                               {
                                                                                console.log('Complete worfkow at '  + Date.now());
                                               alert('done');
                                                               window.location = "https://potashcorp.sharepoint.com/sites/forms/SitePages/Home.aspx";
                                               }
                                               else
                                               {
                                                               window.location = decodeURIComponent(URLSource);
                                               }
                        }
                        break;
                                }
                }
                closeInProgressDialog();
}
function onWorkflowFailed(sender, args)
{
                                dlg = null;
    console.log('Workflow Start failed. ' + args.get_message() + '\n' + args.get_stackTrace());
>>>>>>> 333a001dc3dbd783355614e2d4a3bde2f3155114
}