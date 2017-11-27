function uploadItems() {
    var waitUI = SP.UI.ModalDialog.showWaitScreenWithNoClose('Uploading items...', "Please wait, this shouldn't take long...", 100, 380);
    var item = [];
    var lowerRange = 18;
    var upperRange = 118;
    var checkData = "";
    var invoices = [];

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Documents')/items?$top=100&$select=FileLeafRef",
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function(data) {
            data.d.results.forEach(function(invoice){
                uploadLoop(encodeURIComponent(invoice.FileLeafRef), lowerRange, upperRange, waitUI);
            });
        },
        error: function(data){
            console.log(data);
        }
    });
}

function uploadLoop(invoice, lowerRange, upperRange, waitUI)
{
    var k;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/ExcelRest.aspx/Shared%20Documents/" + invoice + "/model/Ranges('A" + lowerRange + "%7Cbt" + upperRange + "')?$format=json",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var parsed = JSON.parse(data);
            for(k = 0; k <= parsed.rows.length-1; k++)
            {
                var checkDataLoop = (typeof parsed.rows[k][0].fv == 'undefined') ? parsed.rows[k][0].v : parsed.rows[k][0].fv;

                if (typeof checkDataLoop != 'undefined')
                {
                    item = {
                        "__metadata": { "type": "SP.Data.CMBimportListItem" },
                        "InvoiceName": (typeof parsed.rows[k][0].fv == 'undefined') ? parsed.rows[k][0].v : parsed.rows[k][0].fv,
                        "Agency": (typeof parsed.rows[k][1].fv == 'undefined') ? parsed.rows[k][1].v : parsed.rows[k][1].fv,
                        "Invoice_x0020_Line_x0020__x0023_": (typeof parsed.rows[k][2].fv == 'undefined') ? parsed.rows[k][2].v.toString() : parsed.rows[k][2].fv.toString(),
                        "Agency_x0020_Child_x0020_ID": (typeof parsed.rows[k][3].fv == 'undefined') ? parsed.rows[k][3].v.toString() : parsed.rows[k][3].fv.toString(),
                        "Child_x0020_Last_x0020_Name": (typeof parsed.rows[k][4].fv == 'undefined') ? parsed.rows[k][4].v : parsed.rows[k][4].fv,
                        "Child_x0020_First_x0020_name": (typeof parsed.rows[k][5].fv == 'undefined') ? parsed.rows[k][5].v : parsed.rows[k][5].fv,
                        "Child_x0020_Date_x0020_of_x0020_": (typeof parsed.rows[k][6].fv == 'undefined') ? parsed.rows[k][6].v : parsed.rows[k][6].fv,
                        "Age_x0020_Category": (typeof parsed.rows[k][7].fv == 'undefined') ? parsed.rows[k][7].v : parsed.rows[k][7].fv,
                        "Legal_x0020_Status_x000a_APPRE_x": (typeof parsed.rows[k][8].fv == 'undefined') ? parsed.rows[k][8].v : parsed.rows[k][8].fv,
                        "Jurisdiction": (typeof parsed.rows[k][9].fv == 'undefined') ? parsed.rows[k][9].v : parsed.rows[k][9].fv,
                        "Gender": (typeof parsed.rows[k][10].fv == 'undefined') ? parsed.rows[k][10].v : parsed.rows[k][10].fv,
                        "Treaty_x0020_#": (typeof parsed.rows[k][11].fv == 'undefined') ? parsed.rows[k][11].v : parsed.rows[k][11].fv,
                        "Placement_x0020_Type_x0020_": (typeof parsed.rows[k][12].fv == 'undefined') ? parsed.rows[k][12].v : parsed.rows[k][12].fv,
                        "Placement_x0020_Name": (typeof parsed.rows[k][13].fv == 'undefined') ? parsed.rows[k][13].v : parsed.rows[k][13].fv,
                        "Agency_x0020_Placement_x0020_ID": (typeof parsed.rows[k][14].fv == 'undefined') ? parsed.rows[k][14].v : parsed.rows[k][14].fv,
                        "Placement_x0020_Address": (typeof parsed.rows[k][15].fv == 'undefined') ? parsed.rows[k][15].v : parsed.rows[k][15].fv,
                        "Placement_x0020_Community": (typeof parsed.rows[k][16].fv == 'undefined') ? parsed.rows[k][16].v : parsed.rows[k][16].fv,
                        "Postal_x0020_Code_x0020__x0028_o": (typeof parsed.rows[k][17].fv == 'undefined') ? parsed.rows[k][17].v : parsed.rows[k][17].fv,
                        "Month_x0020_of_x0020_Service": (typeof parsed.rows[k][18].fv == 'undefined') ? parsed.rows[k][18].v : parsed.rows[k][18].fv,
                        "Year_x0020_of_x0020_Service": (typeof parsed.rows[k][19].fv == 'undefined') ? parsed.rows[k][19].v : parsed.rows[k][19].fv,
                        "Start_x0020_Day_x0020__x0028_in_": (typeof parsed.rows[k][20].fv == 'undefined') ? parsed.rows[k][20].v : parsed.rows[k][20].fv,
                        "End_x0020_Day_x0020__x0028_in_x0": (typeof parsed.rows[k][21].fv == 'undefined') ? parsed.rows[k][21].v : parsed.rows[k][21].fv,
                        "Billable_x0020_Days": (typeof parsed.rows[k][22].fv == 'undefined') ? parsed.rows[k][22].v : parsed.rows[k][22].fv,
                        "Rate_x0020_Code_x0020_": (typeof parsed.rows[k][23].fv == 'undefined') ? parsed.rows[k][23].v : parsed.rows[k][23].fv,
                        "Level_x0020_of_x0020_Care": (typeof parsed.rows[k][24].fv == 'undefined') ? parsed.rows[k][24].v : parsed.rows[k][24].fv,
                        "For_x0020_Future_x0020_Use": (typeof parsed.rows[k][25].fv == 'undefined') ? parsed.rows[k][25].v : parsed.rows[k][25].fv,
                        // Account for currency/number values
                        "All_x0020_Inclusive_x0020_Placem": getVal(parsed.rows[k][26].fv, parsed.rows[k][26].v),
                        "Basic_x0020_Rate_x0020_per_x0020": getVal(parsed.rows[k][27].fv, parsed.rows[k][27].v),
                        "Agency_x0020_Allowance_x0020_per": getVal(parsed.rows[k][28].fv, parsed.rows[k][28].v),
                        "Northern_x0020_Food_x0020_per_x0": getVal(parsed.rows[k][29].fv, parsed.rows[k][29].v),
                        "Shelter_x0020_per_x0020_diem": getVal(parsed.rows[k][30].fv, parsed.rows[k][30].v),
                        "Total_x0020_Basic_x0020_Per_x002": getVal(parsed.rows[k][31].fv, parsed.rows[k][31].v),
                        "Fee_x0020_for_x0020_Service_x002": getVal(parsed.rows[k][32].fv, parsed.rows[k][32].v),
                        "Total_x0020_Basic_x0020_for_x002": getVal(parsed.rows[k][33].fv, parsed.rows[k][33].v),
                        "Fee_x0020_for_x0020_Service_x0020": getVal(parsed.rows[k][34].fv, parsed.rows[k][34].v),
                        "Total_x0020_All_x0020_Inclusive_": getVal(parsed.rows[k][35].fv, parsed.rows[k][35].v),
                        "Total_x0020_Special_x0020_Needs": getVal(parsed.rows[k][36].fv, parsed.rows[k][36].v),
                        "Total_x0020_Billed": getVal(parsed.rows[k][37].fv, parsed.rows[k][37].v),
                        "Support_x0020_Worker_x0020_paid_": getVal(parsed.rows[k][38].fv, parsed.rows[k][38].v),
                        "Support_x0020_Worker_x0020_paid_0": getVal(parsed.rows[k][39].fv, parsed.rows[k][39].v),
                        "Day_x0020_Care_x0020_": getVal(parsed.rows[k][40].fv, parsed.rows[k][40].v),
                        "Respite_x0020_paid_x0020_to_x002": getVal(parsed.rows[k][41].fv, parsed.rows[k][41].v),
                        "Respite_x0020_paid_x0020_direct": getVal(parsed.rows[k][42].fv, parsed.rows[k][42].v),
                        "Initial_x0020_Child_x0020_Assess": getVal(parsed.rows[k][43].fv, parsed.rows[k][43].v),
                        "Court_x0020_Ordered_x0020_Assess": getVal(parsed.rows[k][44].fv, parsed.rows[k][44].v),
                        "Elder_x0020_Services": getVal(parsed.rows[k][45].fv, parsed.rows[k][45].v),
                        "Therapy": getVal(parsed.rows[k][46].fv, parsed.rows[k][46].v),
                        "Initial_x0020_Clothing": getVal(parsed.rows[k][47].fv, parsed.rows[k][47].v),
                        "Emergency_x0020_Placement_x0020_": getVal(parsed.rows[k][48].fv, parsed.rows[k][48].v),
                        "External_x0020_Agency_x0020_Admi": getVal(parsed.rows[k][49].fv, parsed.rows[k][49].v),
                        "Home_x0020_Visit": getVal(parsed.rows[k][50].fv, parsed.rows[k][50].v),
                        "Reunification": getVal(parsed.rows[k][51].fv, parsed.rows[k][51].v),
                        "Prescriptions": getVal(parsed.rows[k][52].fv, parsed.rows[k][52].v),
                        "Dental": getVal(parsed.rows[k][53].fv, parsed.rows[k][53].v),
                        "Orthodontics": getVal(parsed.rows[k][54].fv, parsed.rows[k][54].v),
                        "Optical": getVal(parsed.rows[k][55].fv, parsed.rows[k][55].v),
                        "General_x0020_Medical": getVal(parsed.rows[k][56].fv, parsed.rows[k][56].v),
                        "Medical_x0020_Transportation": getVal(parsed.rows[k][57].fv, parsed.rows[k][57].v),
                        "Transportation": getVal(parsed.rows[k][58].fv, parsed.rows[k][58].v),
                        "Legal": getVal(parsed.rows[k][59].fv, parsed.rows[k][59].v),
                        "Criminal_x0020_Legal": getVal(parsed.rows[k][60].fv, parsed.rows[k][60].v),
                        "Child_x0020_ID_x0020__x0028_birt": getVal(parsed.rows[k][61].fv, parsed.rows[k][61].v),
                        "Car_x0020_Seats_x0020_up_x0020_t": getVal(parsed.rows[k][62].fv, parsed.rows[k][62].v),
                        "Cribs_x0020_up_x0020_to_x0020__x": getVal(parsed.rows[k][63].fv, parsed.rows[k][63].v),
                        "Camp": getVal(parsed.rows[k][64].fv, parsed.rows[k][64].v),
                        "Retain_x0020_Bed_x0020_Space": getVal(parsed.rows[k][65].fv, parsed.rows[k][65].v),
                        "Funeral_x0020__x002f__x0020_Bere": getVal(parsed.rows[k][66].fv, parsed.rows[k][66].v),
                        "Age_x0020_of_x0020_Majority_x002": getVal(parsed.rows[k][67].fv, parsed.rows[k][67].v),
                        "Other_x0020_Special_x0020_Needs": getVal(parsed.rows[k][68].fv, parsed.rows[k][68].v),
                        "Exceptional_x0020_Circumstance_x": getVal(parsed.rows[k][69].fv, parsed.rows[k][69].v),
                        "Independent_x0020_Living_x0020_C": getVal(parsed.rows[k][70].fv, parsed.rows[k][70].v),
                        "Other_x0020_Special_x0020_Needs_": (typeof parsed.rows[k][71].fv == 'undefined') ? parsed.rows[k][71].v : parsed.rows[k][71].fv
                    }

                    console.log(item);

                    $.ajax({
                        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('CMBimport')/items",
                        type: "POST",
                        contentType: "application/json;odata=verbose",
                        data: JSON.stringify(item),
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val()
                        },
                        success: function (data) {
                            
                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });

                    console.log(k);
                    if (k == 100)
                    {
                        lowerRange = upperRange + 1;
                        upperRange = upperRange + 101;
                        uploadLoop(invoice, lowerRange, upperRange, waitUI);
                    }
                }
                else
                {
                    if (waitUI != null)
                    {
                        waitUI.close();
                        waitUI = null;
                    }
                }
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function getVal(val1, val2)
{
    var value;
    if (typeof val1 == 'undefined')
    {
        value = val2;
    } 
    else
    {
        value = val1;
    }

    if (typeof value != 'undefined')
    {
        value = Number(value.replace(/[^0-9\.-]+/g,""));
    }
    if (isNaN(value))
    {
        value = 0;
    }

    return value;
}