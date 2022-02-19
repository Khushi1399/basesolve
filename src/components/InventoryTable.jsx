import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        regions: state.regions
    }
}
const InventoryTable = ({ data = {}, regions }) => {
    const columns = [
        { headerName: "REGION", field: "region" },
        {
            headerName: "COUNTRY", field: "country"
        },
        { headerName: "CALLING CODE", field: "calling_code" }
        , {
            headerName: "CURRENCY", field: "currencies"
        },
    ];

    return <div>
        <div
            className="ag-theme-balham patient-table"
            style={{
                height: '600px',
                width: '1024px',
            }}
        >
            <AgGridReact
                columnDefs={columns}
                rowData={regions}
                defaultColDef={{
                    sortable: false,
                    minWidth: 100,
                    filter: false,
                    resizable: true,
                }}
            >
            </AgGridReact>
        </div>

    </div >;

};
export default connect(mapStateToProps, null)(InventoryTable);