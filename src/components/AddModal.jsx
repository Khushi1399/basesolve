import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import axios from 'axios'
import { connect } from 'react-redux'
import { addData } from '../actions';

import AsyncSelect from 'react-select/async'

const { Option } = Select;

const AddModal = ({
    visible, setVisible, formik, dispatch
}) => {
    const [countryList, setCountryList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState()

    const [reg, setReg] = useState()
    const [cont, setCont] = useState()

    const onSelectCountryChange = value => {
        setCont()
    }

    const loadContOptions = () => {
        axios({
            method: 'GET',
            url: 'https://restcountries.com/v3.1/region/europe',
        }).then(({ data }) => {
            let list = []
            data.map((reg) => {
                list.push({
                    value: reg.name.common,
                    label: reg.name.common,
                    calling_code: `${reg.idd.root}${reg.idd.suffixes[0]}`,
                    currencies: reg.currencies[`${Object.keys(reg.currencies)[0]}`].name
                })
            })
            setCountryList(list)
        })
    }
    useEffect(() => {
        loadContOptions()
    }, [])

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
        const value = formik.values
        dispatch(addData({ ...value, currencies: selectedCountry.currencies, calling_code: selectedCountry.calling_code }))
        setCont();
        setReg();
    };

    const handleCancel = () => {
        setVisible(false);
    };

    function onChange(value) {
        setReg(value)
        formik.setFieldValue('region', value)
    }

    function onChangeCountry(value) {
        setCont(value)
        formik.setFieldValue('country', value)
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    return (
        <>
            <Modal title="ADD A LOCATION" visible={visible}
                onOk={handleOk} onCancel={handleCancel}
            >
                <div>
                    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                        <Select
                            showSearch
                            placeholder="Select Region"
                            optionFilterProp="children"
                            onChange={onChange}
                            id='region'
                            value={reg}
                        >
                            <Option value="Europe">Europe</Option>

                        </Select></div>
                    {formik.touched.region && formik.errors.region ? (
                        <div className='error-msg'>
                            {formik.errors.region}
                        </div>
                    ) : null}
                    <AsyncSelect
                        isSearchable
                        cacheOptions
                        style={{ paddingTop: '20px' }}
                        placeholder='Select Country'
                        id='country'
                        value={cont}
                        defaultOptions={countryList}
                        loadOptions={loadContOptions}
                        onInputChange={onSelectCountryChange}
                        filterOption={() => true}
                        onChange={data => {
                            setSelectedCountry(data)
                            formik.setFieldValue('country', data.label)
                        }}
                    />
                    {/* <div style={{ paddingTop: '20px' }}><Select
                        showSearch
                        placeholder="Select Country"
                        optionFilterProp="children"
                        onChange={onChangeCountry}
                        onSearch={onSearch}
                        id='country'
                        value={cont}
                    >
                        {countryList?.map((list = {}) => {
                            return <Option value={list.value}>{list.label}</Option>

                        })}

                    </Select> */}
                    {/* </div> */}
                    {formik.touched.country && formik.errors.country ? (
                        <div className='error-msg'>
                            {formik.errors.country}
                        </div>
                    ) : null}
                </div>
            </Modal>
        </>
    );
};

export default connect()(AddModal);
