import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileAction, updateUserProfileAction } from '../../store/action/userAction'
import Box from '@mui/material/Box';
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, FormControl, colors } from '@mui/material';
import Address from './Address';
import ResetPassword from './ResetPassword';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import PersonalInformation from './PersonalInformation';


const steps = ['Personal Information', 'Address', 'Reset Password'];

const MyProfile = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()
    const { getUserProfileDATA, updateUserProfileMSG, updateUserProfilePENDING } = useSelector((state) => state.user)
    const [userProfile, setUserProfile] = useState("")

    useEffect(() => {
        dispatch(getUserProfileAction())
    }, [updateUserProfileMSG])

    useEffect(() => {
        setUserProfile(getUserProfileDATA)
    }, [getUserProfileDATA])

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    return (
        <div>
            <div className='hide w-100 bg-white mt-10 rounded-lg p-6' >
                <h2 className="text-3xl text-gray-900 font-bold tracking-tighter pb-4">My Profile</h2>
                <Box sx={{ width: '100%', padding: "25px", marginTop: "15px" }} style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}  >
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted() ? (
                            <React.Fragment>

                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                    {
                                        activeStep === 0 &&
                                        <PersonalInformation userProfile={userProfile} />
                                    }
                                    {
                                        activeStep === 1 &&
                                        <Address userProfile={userProfile} />
                                    }
                                    {
                                        activeStep === 2 &&
                                        <ResetPassword userProfile={userProfile} />
                                    }
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                        variant="contained"
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                                        Next
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </div>
                </Box>
            </div>

            {/* for small screen or mobile view  */}
            <div className='smallScreenHide w-100 bg-white mt-10 rounded-lg p-6' >
                <PersonalInformation />


                {/* address  */}
                <Address userProfile={userProfile} />

                {/* reset password  */}
                <ResetPassword userProfile={userProfile} />
            </div>
        </div>
    )
}

export default MyProfile
