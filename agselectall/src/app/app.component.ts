import {Component, OnInit, EventEmitter, Input, Output  } from "@angular/core";
import {ColumnApi, GridApi, GridOptions} from "ag-grid/main";
import { HttpClient } from '@angular/common/http';
import { Address } from './address';
import { Student } from './student';
import {HeaderComponent} from "./header.component";
import 'rxjs/add/operator/toPromise';
import { MessageService } from "./webpromise.service";
import { FilterPipe } from './filler.pipe'; 


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

    @Output() messageEvent = new EventEmitter<string>();

    private gridApi;
    private gridColumnApi;
    
    private rowHeightMaster;

    
    constructor(private http: HttpClient, private messageService: MessageService ) {


    }


    detailColumnDefs = [
        {
            headerName: "Student ID", field: "studentid", suppressMenu: false, headerComponentParams: {
                menuIcon: 'fa-taxi',
                template: '<div class="ag-cell-label-container" role="presentation" style="color: green ;background-color: aliceblue;float: center !important; ><b>' +
                '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"  style="float:right;"></span>' +
                '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"  style="float:right;"></span>' +
                '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"  style="float:right;"></span>' +
                '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" style="float:right;"></span>' +
                '    ** <span ref="eText" class="ag-header-cell-text" role="columnheader" style="margin-right:auto;"></span>' +
                '<span class="customHeaderMenuButton"><i class="fa fa-tasks""></i></span>' +
                '<span class="customHeaderLabel" style="float:right;"><b> </span> ' +

                '  </div>' +
                '</div>'
            }
        },
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
            filterParams: { apply: true, newRowsAction: 'keep' }
        }, {
            headerName: " ", field: "", suppressMenu: true,
            checkboxSelection: function(params) {

                if (params.data.id === '101' || params.data.id === '104') {
                    return false;
                } else {
                    return true;
                }
            }, headerCheckboxSelection: function(params) {
                return false;

                // return params.columnApi.getRowGroupColumns().length === 0;
            }, headerComponentFramework: <{ new (): HeaderComponent }>HeaderComponent, headerComponentParams: {
                menuIcon: 'fa-taxi',
            }
        },
        { headerName: "ID", field: "id", cellRenderer: 'agGroupCellRenderer', cellRendererParams: { checkbox: false } },
        { headerName: "Name", field: "name", suppressMenu: true },
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



    onPageSizeChanged(newPageSize) {
        //  let value = document.getElementById("page-size").value;
        this.gridApi.paginationSetPageSize(newPageSize);
        this.gridApi.setQuickFilter(newPageSize);
    }

     onRowClicked(event: any) {
         this.rowHeightMaster=[];
      console.log('row', event);
           this.http.get('http://localhost:8080/aggrid/address?id=' + event.data.id).subscribe(data => { 
           this.rowHeightMaster=data as Address[]
               let vrt= this.rowHeightMaster.length * 20 + 100;
           console.log(vrt);
               this.gridOptions.detailRowHeight=vrt;
                        console.log(this.gridOptions);
                })

         
}


    onGridReady(params) {
      //  console.log(params);
        this.messageEvent.emit(params.api)
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    ngOnInit() {
              let rh=this.rowHeightMaster;      
          let _http=this.http;
          let tps;
        this.http.get('http://localhost:8080/aggrid/student').subscribe(data => {
            this.rowDataMaster = data as Student[]
         //   console.log(this.rowDataMaster);
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
            embedFullWidthRows: true,
            detailRowHeight: 260,
            //  pagination: true,
            //   paginationPageSize: 2,
            components: {
                // agColumnHeader: CustomHeader
            },
            defaultColDef: {
                width: 100,

            },
            getRowHeight: function(params  ) {
                if (params.node.master) {
                    return 20;
                } else {;
        //    let filterPipe= new FilterPipe(_http,params.data.id).transform();
               // console.log(rh);
                    return 200;
                }
            },
            onRowClicked : function(params){
                 console.log(params);
              
            },
            
            detailCellRendererParams: {
                detailGridOptions: this.detailGridOptions,
                getDetailRowData: function(params) {
                    _http.get('http://localhost:8080/aggrid/address?id=' + params.data.id).subscribe(data => {
                        params.successCallback(data);
                        
                    });
                }
            },
            onGridReady: function(params) {
                params.api.forEachNode(function(node) {
                    //     node.setExpanded(node.id === "1");
                });
                params.api.sizeColumnsToFit();
                this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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

    onSelectionChanged(saveUsername) {
        console.log(saveUsername + 'from App controller');
        if (saveUsername) {
            this.gridApi.forEachNode(function(node) {
                if (node.data.id === '101' || node.data.id === '104') {
                    node.setSelected(false);
                }
            });
        }
    }

}


