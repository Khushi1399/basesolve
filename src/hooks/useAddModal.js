import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { addData } from '../actions';

const useAddModal = () => {
    const [regionData, setRegionData] = useState([])

    const listData = () => {
        axios({
            method: 'GET',
            url: 'https://restcountries.com/v3.1/region/europe',
        }).then((res) => {
            setRegionData(res.data)
        })
    }

    useEffect(() => {
        listData();
    }, [])

    const onSubmitCountry = () => {
        const value = formik.values
        addData({ ...value, currency: 'USD', calling_code: '+345' })
    }

    const formik = useFormik({
        initialValues: {
            region: '',
            country: '',
        },
        validationSchema: Yup.object({
            region: Yup.string()
                .required('This field is required'),
            country: Yup.string()
                .required('This field is required')

        }),
        onSubmit: values => {
            onSubmitCountry(values)
        },
    })
    return { formik, regionData, onSubmitCountry }
}

export default useAddModal