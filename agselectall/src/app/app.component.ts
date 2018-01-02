import {Component, OnInit} from "@angular/core";
import {ColumnApi, GridApi, GridOptions} from "ag-grid/main";
import { HttpClient } from '@angular/common/http';
import { Address } from './address';
import { Student } from './student';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'AG Grdi Master Details!'
    public rowDataMaster = [];
    public datachild = [];

    gridOptions: GridOptions;
    public selectedAll = false;
    
     private gridApi;
  private gridColumnApi;

    detailColumnDefs = [
        { headerName: "Student ID", field: "studentid" },
        { headerName: "CITY", field: "city" },
        { headerName: "Country", field: "country" },
        { headerName: "School", field: "school" },
        { headerName: "Location", field: "location" }
    ];



    masterColumnDefs = [
    {
        headerName: "S.No.",
        valueGetter: "node.id",
        filter: "agNumberColumnFilter",
       filterParams: {apply: true, newRowsAction: 'keep'}
      },

        {
            headerName: " ", field: "",  headerCheckboxSelectionFilteredOnly: true, filter: "agTextColumnFilter",
            checkboxSelection: function(params) {
                // console.log(params.data.id);
                if (params.data.id === '101' || params.data.id === '104') {
                    return false;
                } else {
                    return true;
                }
            }, 
            
               headerCheckboxSelection: function(params) {
                   
               console.log(params);
          return params.columnApi.getRowGroupColumns().length === 0;
        }
        },
        { headerName: "ID", field: "id", cellRenderer: 'agGroupCellRenderer', cellRendererParams: { checkbox: false } },
        { headerName: "Name", field: "name" },
        { headerName: "Phone", field: "phone" },
        { headerName: "PAN", field: "pan" },
        { headerName: "AADHAR", field: "aadhar" }
    ];

    detailGridOptions: GridOptions = {
        columnDefs: this.detailColumnDefs,
        onGridReady: function(params) {
            params.api.sizeColumnsToFit();
        }
    };


    constructor(private http: HttpClient) {
     
        this.http.get('http://localhost:8080/aggrid/student').subscribe(data => {
            this.rowDataMaster = data as Student[]
            console.log(this.rowDataMaster);
        });
        this.gridOptions = {
            columnDefs: this.masterColumnDefs,
            rowData: this.rowDataMaster,
            masterDetail: true,
         //   rowModelType: 'enterprise',
            enableCellChangeFlash: true,
            rowSelection: 'multiple',
            rowDeselection: true,
            suppressRowClickSelection: true,
            enableRangeSelection: true,
            enableSorting: true,
            enableFilter: true,
            animateRows: true,
            headerHeight: 30,
            pagination: true,
            paginationPageSize: 2,

            enableServerSideSorting: true,
            enableServerSideFilter: true,
          //  rowModelType: "infinite",
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 2,
            infiniteInitialRowCount: 2,
            maxBlocksInCache: 2,


            detailCellRendererParams: {
                detailGridOptions: this.detailGridOptions,
                getDetailRowData: function(params) {
                    http.get('http://localhost:8080/aggrid/address?id=' + params.data.id).subscribe(data => {
                        params.successCallback(data);
                    });
                }
            },
            onGridReady: function(params) {
                params.api.forEachNode(function(node) {
                    //     node.setExpanded(node.id === "1");
                });
                params.api.sizeColumnsToFit();
            },
            onSelectionChanged: function(params) {
                console.log(params.api.getSelectedRows());
                if (!this.selectedAll) {
                    params.api.forEachNode(function(node) {
                        if (node.data.id === '101' || node.data.id === '104') {
                          node.setSelected(false);
                        }
                    });
                } else {
              //     params.api.deselectAll();

                }               
            //   this.selectedAll = ! this.selectedAll;
            //    console.log(this.selectedAll);
            }
        }
    }
    
   onPageSizeChanged(newPageSize) {
  //  let value = document.getElementById("page-size").value;
    this.gridApi.paginationSetPageSize(newPageSize);
    this.gridApi.setQuickFilter(newPageSize);
  }
    


    onGridReady(params) {
        console.log(params);
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    ngOnInit(): void { }


}


