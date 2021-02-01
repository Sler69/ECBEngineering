import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


const CarSheet = (props) => {
    const { description, make, model, estimatedate, 
        image, id, index, inMaintenance, updateCarSheetInfo, name } = props;

    const cleanClientName = name || '';
    const [isInMaintenance, setIsInMaintenance] = useState(!!inMaintenance);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [clientName, setClientName] = useState(cleanClientName);

    useEffect(()=>{
        setIsInMaintenance(!!inMaintenance)
    }, [inMaintenance]);

    const updateMaintenaceStatus = () => {
        const newMaintenanceValue = !isInMaintenance;
        setIsInMaintenance(!newMaintenanceValue);
        updateCarSheetInfo(index, {inMaintenance: newMaintenanceValue});
    }

    const handleClose = () =>{ 
        setIsDialogOpen(false);
        const valueOfOldName = name || '';
        setClientName(valueOfOldName);
    }

    const handleOpen = () => {
        setIsDialogOpen(true);
    }

    const saveClientName = () => {
        updateCarSheetInfo(index, {name: clientName});
        setIsDialogOpen(false);
    }

    const handleTextField = (e) => {
        const newValue = e.target.value;
        setClientName(newValue);
    }

    const buttonLabel = isInMaintenance ? 'Remove from Maintenance' : 'Put in Maintenance'
    return (
        <div>
            <Card style={{
                marginBottom: '10px'
            }}>
                <CardContent>
                    {isInMaintenance && <BuildRoundedIcon/>}
                    <Typography variant="h4">
                            Car Model
                    </Typography>
                    <Typography >
                            Brand: {make} Model: {model}
                    </Typography>
                    <Typography varian="h5">
                        Description of Fix: {description}
                    </Typography>
                        <Typography variant="h5">
                            Fixing issue
                        </Typography>
                        <Typography variant="h6">Estimated Release Date{estimatedate}</Typography>
                </CardContent>  
                <CardActions>
                        <Button size="small" onClick={updateMaintenaceStatus}>{buttonLabel}</Button>
                        <Button size="small" onClick={handleOpen}>Edit Owner</Button>
                </CardActions>
            </Card>
            <Dialog
                open={isDialogOpen}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{"Information of the Owner"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Update the name of the client
                    </DialogContentText>
                    <TextField value={clientName} id="standard-basic" label="Owner's Name" onChange={handleTextField}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveClientName} color="primary" autoFocus>
                        Update Client's Name
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CarSheet;