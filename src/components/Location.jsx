import React, { useEffect, useState } from 'react';
import InventoryTable from './InventoryTable';
import axios from 'axios'
import { connect } from 'react-redux'

const Location = () => {
    const [regionData, setRegionData] = useState([])
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://restcountries.com/v3.1/region/europe',
        }).then((res) => {
            setRegionData(res.data)
        })
    }, [])

    return (<>
        <InventoryTable data={regionData} />
    </>)

}
export default connect()(Location);
