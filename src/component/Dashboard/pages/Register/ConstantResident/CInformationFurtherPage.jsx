import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
import DateInput from "../../../../CustomInputs/DateInput";
class CInformationFurtherPage extends Component {
    static contextType = BuildingContext;

    state = {}
    render() {
        return (
            <>
                <div className="register-step-box" style={{marginBottom: "200px"}}>
                    <h2>مشخصات تکمیلی</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFurtherValidation.phoneNumber_requiredReg}
                                condition2={this.context.constantInformationFurtherValidation.phoneNumber_telephoneReg}
                                value={this.context.constantInformationFurther.phoneNumber}
                                fieldNameString={'constantInformationFurther'}
                                valueOfInputString={'phoneNumber'}
                                required={true}
                                label={'شماره همراه اقامتگر'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFurtherValidation.telephoneNumber_requiredReg}
                                condition3={this.context.constantInformationFurtherValidation.telephoneNumber_homeTelephoneReg}
                                value={this.context.constantInformationFurther.telephoneNumber}
                                fieldNameString={'constantInformationFurther'}
                                valueOfInputString={'telephoneNumber'}
                                required={true}
                                label={'شماره تلفن منزل'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput condition1={this.context.constantInformationFurtherValidation.startDate_requiredReg}
                                       value={this.context.valueOfDates.constantResident.startDate}
                                       valueFieldString={'constantResident'}
                                       fieldNameString={'constantInformationFurther'}
                                       valueOfInputString={'startDate'}
                                       timeInclude={true}
                            />
                            <label className="placeholder" style={{
                                top: '-5px',
                                backgroundColor: '#fff',
                                color: '#84888a',
                                margin: '0 .3rem',
                                opacity: '1',
                            }}>تاریخ شروع پذیرش<span style={{color: '#ff4f4f'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput condition1={this.context.constantInformationFurtherValidation.endDate_requiredReg}
                                       value={this.context.valueOfDates.constantResident.endDate}
                                       valueFieldString={'constantResident'}
                                       fieldNameString={'constantInformationFurther'}
                                       valueOfInputString={'endDate'}
                                       timeInclude={true}
                            />
                            <label className="placeholder" style={{
                                top: '-5px',
                                backgroundColor: '#fff',
                                color: '#84888a',
                                margin: '0 .3rem',
                                opacity: '1',
                            }}>تاریخ اتمام پذیرش<span style={{color: '#ff4f4f'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFurtherValidation.address_requiredReg}
                                value={this.context.constantInformationFurther.address}
                                fieldNameString={'constantInformationFurther'}
                                valueOfInputString={'address'}
                                required={true}
                                label={'آدرس محل سکونت'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export  default CInformationFurtherPage ;