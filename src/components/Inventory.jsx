import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Location from './Location';
import AddModal from './AddModal';
import useAddModal from '../hooks/useAddModal';

const Inventory = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { formik, onSubmitCountry } = useAddModal()

    return (<>
        <div className='header'>Inventory</div>
        <Tabs>
            <TabList className='nav-border'>
                <Tab>LOCATIONS</Tab>
                <Tab>COMPANIES</Tab>
                <Tab>STATS</Tab>
            </TabList>
            <div className='addButton' onClick={() => { formik.resetForm(); setIsModalVisible(true) }}>
                <Button shape="circle">
                    <PlusOutlined />
                </Button>
            </div>
            <TabPanel>
                <Location />
            </TabPanel>
            <TabPanel>
                <h2>Companies</h2>
            </TabPanel>
            <TabPanel>
                <h2>Stats</h2>
            </TabPanel>
        </Tabs>
        <AddModal onSubmitCountry={onSubmitCountry} setVisible={setIsModalVisible} visible={isModalVisible} formik={formik} /></>)
}
export default Inventory