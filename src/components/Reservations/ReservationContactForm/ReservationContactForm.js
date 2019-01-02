import React from 'react'
import TextField from '@material-ui/core/TextField';
import {I18n} from 'aws-amplify'
import styles from './ReservationContactForm.module.css'
import {Formik} from 'formik'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const ReservationContactForm = React.forwardRef((props, ref) => {
    let {email, description} = props
    return (
        <div ref={ref}>
            <Formik
            initialValues={{email: email, description: description}}
            onSubmit={props.handleContactInfo}
            render={({values,
                errors,
                status,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,}) => (
                    <form onSubmit={handleSubmit}>
                    
                    <TextField 
                        required
                        value={values.email}
                        onChange={handleChange}
                        name={'email'}
                        onBlur={handleBlur}
                        className={styles.TextField}
                        type={'email'}
                        variant={'filled'}
                        margin={'normal'}
                        fullWidth
                        label={I18n.get('ReservationsPage-form-contact-email-label')}
                    />
                    <TextField
                        value={values.description}
                        onChange={handleChange} 
                        name={'description'}
                        onBlur={handleBlur}
                        variant={'filled'}
                        margin={'normal'}
                        multiline
                        rowsMax="4"
                        fullWidth
                        className={styles.TextField}
                        label={I18n.get('ReservationsPage-form-contact-description-label')}
                    />
                    <Grid container>
                        <Grid item xs={12} className={styles.SubmitBar}>
                        <Button
                        type={'submit'}
                        variant={'contained'}
                        disabled={isSubmitting || errors.email}
                        >{I18n.get('ReservationsPage-contact-step-save-btn')}</Button>
                        </Grid>
                    </Grid>
                    
                    
                </form> 
                )}    
            />
        </div>
        
        
    )
})
export default ReservationContactForm