import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import CarSheet from '../Components/CarSheet';

function CarMaintenance  () {

    const [isLoading,setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [carsInformation, setCarsInformation] = useState([]);
    useEffect(()=>{
        axios.get('/maintenance/cars',{})
        .then((response) =>{
            setIsLoading(false);
            const dataInformation = response.data;
            setCarsInformation(dataInformation.carsMaintenance);
        }).catch((error) => {
            setErrorMessage(`There was an error with car maintenance server ${error}`)
        })
    }, [])

    const updateCarSheetInfo = (index, value) => {
        const newInformation = carsInformation.map((ele, i) => {
            if(index === i) {
                return Object.assign(ele, value);
            }
            return ele;
        });
        setCarsInformation(newInformation);
    }

    const updateCarSheetFile = () => {
        setIsLoading(true);
        axios.post('/maintenance/update', {
            newInformation: carsInformation
        }).then((response)=>{
            console.log(response);
            setIsLoading(false);
        }).catch((error)=>{
            console.log(error);
            setIsLoading(false);
        })
    }

    return (
    <Container maxWidth="sm" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        {errorMessage && <Typography>{errorMessage}</Typography>}
        {isLoading && <CircularProgress/>}
        {!isLoading && <div>
            <div>
                <Button color="primary" onClick={updateCarSheetFile}>Update Information</Button>
            </div>
            {carsInformation.map((ele, index) => {
                const { id } = ele;
                return <CarSheet id={id} index={index} updateCarSheetInfo={updateCarSheetInfo} {...ele}></CarSheet>
            })}
        </div>}
    </Container>
    )
}

export default CarMaintenance;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<CarMaintenance />, wrapper) : false;