import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";

class OGInformationFamilyPage extends Component {
    static contextType = BuildingContext;

    state = {  }
    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات بستگان</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className='col-12 pe-3 mb-3'>شخص اول</div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control ${this.context.otherGuestInformationFamilyValidation.firstPerson_FullName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformationFamily.firstPerson_FullName}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformationFamily', 'firstPerson_FullName')}
                                   placeholder=" "
                            />
                            <label className="placeholder"  style={{right: this.context.otherGuestInformationFamilyValidation.firstPerson_FullName_requiredReg === false ? '35px' : '12px'}}>
                                نام و نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationFamilyValidation.firstPerson_FullName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control ${(this.context.otherGuestInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg &&
                                       this.context.otherGuestInformationFamilyValidation.firstPerson_PhoneNumber_telephoneReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformationFamily.firstPerson_PhoneNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformationFamily', 'firstPerson_PhoneNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.otherGuestInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg &&
                                    this.context.otherGuestInformationFamilyValidation.firstPerson_PhoneNumber_telephoneReg) === false ? '35px' : '12px'}}>
                                شماره تماس
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }
                            {
                                (this.context.otherGuestInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg === true &&
                                    this.context.otherGuestInformationFamilyValidation.firstPerson_PhoneNumber_telephoneReg === false)
                                    ? <small
                                        className="text-danger">{this.context.errors['telephoneRegex']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.otherGuestInformationFamily.firstPerson_FatherName}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformationFamily', 'firstPerson_FatherName')}
                                   placeholder=" "
                            />
                            <label className="placeholder">نام  پدر</label>

                        </div>
                        <div className="input-group-register col-3">
                            <select className='input'
                                    value={this.context.otherGuestInformationFamily.firstPerson_relationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformationFamily', 'firstPerson_relationshipWithResident')}
                            >
                                <option value='father'>پدر</option>
                                <option value='mother'>مادر</option>
                                <option value='sister'>خواهر</option>
                                <option value='brother'>برادر</option>
                                <option value='other'>غیره</option>
                            </select>
                            <label className="placeholder">نسبت با اقامتگر</label>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap justify-content-start mt-4'>
                        <div className='col-12 pe-3 mb-3'>شخص دوم</div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control ${this.context.otherGuestInformationFamilyValidation.secondPerson_FullName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformationFamily.secondPerson_FullName}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformationFamily', 'secondPerson_FullName')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.otherGuestInformationFamilyValidation.secondPerson_FullName_requiredReg === false ? '35px' : '12px'}}>
                                نام و نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationFamilyValidation.secondPerson_FullName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control ${(this.context.otherGuestInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg &&
                                       this.context.otherGuestInformationFamilyValidation.secondPerson_PhoneNumber_telephoneReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformationFamily.secondPerson_PhoneNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformationFamily', 'secondPerson_PhoneNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.otherGuestInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg &&
                                    this.context.otherGuestInformationFamilyValidation.secondPerson_PhoneNumber_telephoneReg) === false ? '35px' : '12px'}}>
                                شماره تماس
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }
                            {
                                (this.context.otherGuestInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg === true &&
                                    this.context.otherGuestInformationFamilyValidation.secondPerson_PhoneNumber_telephoneReg === false)
                                    ? <small
                                        className="text-danger">{this.context.errors['telephoneRegex']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.otherGuestInformationFamily.secondPerson_FatherName}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformationFamily', 'secondPerson_FatherName')}
                                   placeholder=" "
                            />
                            <label className="placeholder">نام  پدر</label>

                        </div>
                        <div className="input-group-register col-3">
                            <select className='input'
                                    value={this.context.otherGuestInformationFamily.secondPerson_relationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformationFamily', 'secondPerson_relationshipWithResident')}
                            >
                                <option>پدر</option>
                                <option>مادر</option>
                                <option>خواهر</option>
                                <option>برادر</option>
                                <option>غیره</option>
                            </select>
                            <label className="placeholder">نسبت با اقامتگر</label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default OGInformationFamilyPage;