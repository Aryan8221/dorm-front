import React, {Component} from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import DatePicker from "react-multi-date-picker";
import 'react-persian-datepicker/lib/styles/basic.css'
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {Modal} from "react-bootstrap";
import {IoIosAddCircleOutline} from "react-icons/io";
import "../../../../style/evan-calender-style.css";
import '../../../../style/paymentPage.css';
import {AiFillCloseCircle} from "react-icons/ai";
import {MdCloudUpload, MdDelete} from "react-icons/md";
import {RiFileUploadFill} from "react-icons/ri";
import ReactLoading from 'react-loading';
import Alert from 'react-bootstrap/Alert';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Box, Button, CircularProgress, FormControl, IconButton, MenuItem, Select} from "@mui/material";
import {green} from "@mui/material/colors";
import axios from "axios";
import {IoAddOutline} from "react-icons/io5";


class PaymentPage extends Component {
    state = {
        deleteLoading: false,
        submitLoading: false,
        uploadLoading: false,
        choices: [],
        tempChoices: [],
        inputType: "",
        showType: false,

        styles: {
            calendarContainer: "calendarContainer",
            dayPickerContainer: "dayPickerContainer",
            monthsList: "monthsList",
            daysOfWeek: "daysOfWeek",
            dayWrapper: "dayWrapper",
            selected: "selected",
            heading: "heading",
            next: "next",
            prev: "prev",
            title: "title",
        },
        isUpload: false,
        hasError: false,
        uploadFile: [],

        dataPicker: null,
        date: '',
        selectedType: null,
        price: '',
        description: '',
        priceType: "IRR", // default value
        fileName: "",
        fileId: "",
        paymentType: "receive",

        Validations: {
            price_requiredReg: '',
            price_numberReg: '',
            selectedTypeBoolean: true,
            date_requiredReg: '',
        },
        showDoneModal: false
    }

    p2e = (input) => {
        return input.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    }
    a2e = (input) => {
        return input.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    }

    async componentDidMount() {
        axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Payment', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                choices: data,
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Payment', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    choices: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Payment', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    choices: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    render() {
        return (
            <>
                <div className="back-btn mb-2">
                    <Link to="/dashboard">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>
                <div className="payment-box">
                    <div className="title">
                        <h4>ثبت فاکتور</h4>
                    </div>
                    <div className="d-flex flex-wrap flex-md-row flex-column">
                        <div className="input-group-register col-md-2 col-12">
                            <FormControl className={"w-100"}>
                                <Select
                                    sx={{ height: 50, borderRadius: 2}}
                                    id="select-field"
                                    value={this.state.priceType}
                                    onChange={(e) => {
                                        this.handlePriceType(e)
                                    }}>
                                    <MenuItem value={"IRR"}>ریال</MenuItem>
                                    <MenuItem value={"USD"}>دلار</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-8px',
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0.2rem',
                                    padding: '0 .4rem',
                                    opacity: '1',
                                }}>واحد</label>
                            </FormControl>
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <input id="price"
                                   type='text'
                                   value={this.state.price}
                                   className={`input form-control ${(this.state.Validations.price_requiredReg && this.state.Validations.price_numberReg) === false ? "is-invalid" : ""}`}
                                   onChange={(e) => {
                                       this.handlePriceInput(this.p2e(this.a2e(e.target.value)))
                                   }}/>
                            <label className="placeholder" style={{
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                margin: '0 0.4rem',
                                padding: '0 .4rem',
                                opacity: '1'
                            }}
                            >مبلغ</label>
                            {
                                this.state.Validations.price_requiredReg === false
                                    ? <small
                                        className="text-danger">این فیلد الزامی است!</small>
                                    : <div/>
                            }
                            {
                                (this.state.Validations.price_numberReg === false && this.state.Validations.price_requiredReg === true)
                                    ? <small
                                        className="text-danger">عدد وارد کنید!</small>
                                    : <div/>
                            }
                        </div>
                        <div className="input-group-register col-md-6 col-12 d-flex">
                            <FormControl className={"w-100"}>
                                <Select
                                    sx={{border: this.state.Validations.selectedTypeBoolean ? "" : "1px red solid", height: 50, borderRadius: "0.5rem", minWidth: '8rem', backgroundColor: '#fff'}}
                                    id="select-field"
                                    onChange={(e) => this.setState({selectedType: e.target.value})}>
                                    {
                                        this.state.choices.map((c) => (
                                            <MenuItem value={c.name}>{c.name}</MenuItem>
                                        ))
                                    }
                                    {
                                        this.state.tempChoices.map((c) => (
                                            <MenuItem value={c}>{c}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0',
                                    padding: '0 .4rem -0.4rem',
                                    opacity: '1',
                                }}>دسته بندی</label>
                                {
                                    this.state.Validations.selectedTypeBoolean // ifSelected condition
                                        ?
                                        <div className="d-flex justify-content-start mb-3">
                                            <small className="text-danger">&nbsp;</small>
                                        </div>
                                        : <div className="d-flex justify-content-start mb-3">
                                            <small className="text-danger">یکی از فیلدهای بالا را اتخاب
                                                کنید!</small>
                                        </div>
                                }
                            </FormControl>
                    <div className="col-md-1 col-2 d-flex flex-column align-item-center">
                                <IconButton color="primary" onClick={() => {
                                    this.handleOpenType()
                                }}>
                                    <IoAddOutline size={30} width={'50%'} height={'50%'}/>
                                </IconButton>
                                <div className="d-flex mb-3">
                                    <small className="text-danger">&nbsp;</small>
                                </div>
                            </div>
                        </div>
                        <div className="input-group-register col-md-2 col-12 date-container">
                            <DatePicker
                                calendarPosition={`top`}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                format={`YYYY/MM/DD`}
                                containerStyle={{
                                    width: "100%"
                                }}
                                inputClass={`input form-control`}
                                value={this.state.dataPicker}
                                onChange={(value) => {
                                    this.handleDateInput(value)
                                }}
                                mapDays={({ date }) => {
                                    let props = {}
                                    let isWeekend = [6].includes(date.weekDay.index)

                                    if (isWeekend)
                                        props.className = "highlight highlight-red";

                                    return props
                                }}

                                weekDays={
                                    [
                                        ["شنبه", "Sat"],
                                        ["یکشنبه", "Sun"],
                                        ["دوشنبه", "Mon"],
                                        ["سه شنبه", "Tue"],
                                        ["چهارشنبه", "Wed"],
                                        ["پنجشنبه", "Thu"],
                                        ["جمعه", "Fri"],
                                    ]
                                }

                                calendar={persian}
                                locale={persian_fa}

                            >
                                <Button
                                    onClick={() => {
                                        this.setState({dataPicker: {}})
                                    }
                                    }
                                >
                                    ریست
                                </Button>
                            </DatePicker>
                            <label className="placeholder" style={{
                                top: '-8px',
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                margin: '0.3rem 0.4rem',
                                padding: '0 0.4rem',
                                opacity: '1',
                            }}>تاریخ</label>
                        </div>
                        <div className="input-group-register col-md-10 col-12">
                                <textarea className="input form-control" value={this.state.description} placeholder=" "
                                          onChange={(e) => {
                                              this.handleDescriptionInput(e)
                                          }}></textarea>
                            <label className="placeholder" style={{
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                margin: '0 0.4rem',
                                padding: '0 0.4rem',
                                opacity: '1',
                            }}>توضیحات</label>
                        </div>
                        <div className="input-group-register col-md-2 col-12">
                            <FormControl className={"w-100"}>
                                <Select
                                    sx={{ height: 50, borderRadius: 2}}
                                    id="select-field"
                                    value={this.state.paymentType}
                                    onChange={(e) => {
                                        this.setState({paymentType:e.target.value})
                                    }}>
                                    <MenuItem value={"receive"}>دریافت</MenuItem>
                                    <MenuItem value={"expend"}>پرداخت</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-8px',
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0.2rem',
                                    padding: '0 .4rem',
                                    opacity: '1',
                                }}>نوع</label>
                            </FormControl>
                        </div>
                    </div>
                    <div className='third-section mx-2 mt-3'>
                        <label htmlFor="formFileLg" className="form-label">آپلود فاکتور :</label>
                        <div className="row">
                            <div className="col-6">
                                <input className="form-control form-control " id="formFileLg" type="file"
                                       onChange={(e) => {
                                           this.handleInputFile(e)
                                       }}/>
                            </div>
                            <div className="col-6">
                                {this.state.isUpload && !this.state.hasError ? (
                                    <div className="file-container" style={{marginTop: '-2px'}}>
                                        <button disabled={this.state.deleteLoading} className="deleteBtn" onClick={this.handleDeleteFile}><MdDelete
                                            fontSize="25px"/></button>
                                        <div className="d-flex align-items-center">
                                            <h6 className="mx-1">{this.state.fileName}</h6>
                                            <RiFileUploadFill/>
                                        </div>
                                    </div>
                                ) : (this.state.uploadLoading ? (
                                        <div className="d-flex align-item-start">
                                            <button className="uploadBtn" onClick={this.handleUpload}
                                                    disabled={this.state.uploadLoading}><MdCloudUpload fontSize="35px"/>
                                            </button>
                                            <ReactLoading type="cylon" color="#bdc3c7" className="submitLoading" height={1}
                                                          width={45}/>
                                        </div>
                                    ) : (
                                        <button className="uploadBtn" onClick={this.handleUpload}
                                                disabled={this.state.uploadLoading}><MdCloudUpload fontSize="35px"/>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        <div>
                            {
                                this.state.isUpload && (
                                    (this.state.hasError) ? (
                                        <Alert variant='danger' className="mt-3">
                                            فایل آپلود نشد
                                        </Alert>
                                    ) : (
                                        <Alert variant='success' className="mt-3">
                                            فایل با موفقیت آپلود شد
                                        </Alert>
                                    )
                                )
                            }
                        </div>


                    </div>
                    <div className='fourth-section mt-5 mb-3 d-flex justify-content-center'>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone"}
                                variant="contained"
                                disabled={this.state.submitLoading || this.state.uploadLoading}
                                onClick={this.handleSubmitPayment}
                            >
                                ثبت
                            </Button>
                            {this.state.submitLoading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </div>
                </div>

                <Modal centered show={this.state.showType} onHide={() => {
                    this.handleCloseType()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن دسته بندی</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <input type='text'
                               className='form-control mt-3 mb-3 input'
                               onChange={(e) => this.handleInputChange(e)} placeholder="دسته بندی جدید"/>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <button className="btn btn-success" onClick={(event) => {
                            this.handleSubmitType(event)
                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
                            this.handleCloseType()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showDoneModal} className='modal-done'>
                    <Modal.Body className="px-4">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-column">
                                <div className="icon">
                                    <span className="glyphicon glyphicon-ok"></span>
                                </div>
                                <div className="title-modal-done">
                                    موفق!
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between my-3">
                                <Link to="/dashboard/PaymentHistory" className='btn button-show'
                                      onClick={() => this.setState({showDoneModal: false})}>رفتن به صورتحساب</Link>
                                <Link to="" className='btn button-close'
                                      onClick={() => {this.setState({showDoneModal: false});
                                          window.location.reload(false);
                                      }}>بستن</Link>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    handleOpenType = () => {
        this.setState({showType: true});
    }

    handleCloseType = () => {
        this.setState({inputType: "", showType: false});
    }

    handleAlignment = (event, newAlignment) => {
        this.setState({selectedType: newAlignment});

    }

    handleInputChange = (e) => {
        this.setState({inputType: e.target.value});
    }

    handleDeleteFile = async () => {
        this.setState({deleteLoading: true})
        // await fetch(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileId}`, {
        //     method: 'DELETE',
        // })
        //     .then(res => res.text())

        axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.setState({fileId: ""});
        this.setState({isUpload: false});
        this.setState({deleteLoading: false});

    }

    handleSubmitType = (e) => {
        e.preventDefault();
        let regCheck = /^\s*$/;
        if (!regCheck.test(this.state.inputType)) {
            let updateChoice = [...this.state.tempChoices];
            if (!updateChoice.includes(this.state.inputType)) {
                updateChoice.push(this.state.inputType);
                this.setState({tempChoices: updateChoice});
            }
        }
        this.setState({showType: false})
    }

    handleDeleteType = (index) => {
        let updateChoice = [...this.state.tempChoices];
        updateChoice.splice(index, 1);
        this.setState({tempChoices: updateChoice});
    }

    handleUpload = async () => {
        this.setState({uploadLoading: true});
        let formData = new FormData();
        formData.append('file', this.state.uploadFile[0]);

        axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                fileId: data.message.id,
                isUpload: true,
                hasError: false,
                uploadLoading: false
            }))
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        fileId: data.message.id,
                                        isUpload: true,
                                        hasError: false,
                                        uploadLoading: false
                                    }))
                                    .catch((error) => {
                                        this.setState({isUpload: true})
                                        this.setState({hasError: true})
                                        this.setState({uploadLoading: false});
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        fileId: data.message.id,
                                        isUpload: true,
                                        hasError: false,
                                        uploadLoading: false
                                    }))
                                    .catch((error) => {
                                        this.setState({isUpload: true})
                                        this.setState({hasError: true})
                                        this.setState({uploadLoading: false});
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
    }

    handleValidations = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^[0-9]*$/;

        let price_requiredReg = !requiredReg.test(this.state.price);
        let price_numberReg = numberReg.test(this.state.price);
        let selectedTypeBoolean = this.state.selectedType !== null;
        let date_requiredReg = !requiredReg.test(this.state.date);

        let newValidations = {...this.state.Validations};
        newValidations.price_requiredReg = price_requiredReg;
        newValidations.price_numberReg = price_numberReg;
        newValidations.selectedTypeBoolean = selectedTypeBoolean;
        newValidations.date_requiredReg = date_requiredReg;

        this.setState({Validations: newValidations});

        return price_requiredReg && price_numberReg && selectedTypeBoolean && date_requiredReg;
    }

    handleInputFile = async (event) => {
        this.setState({uploadFile: event.target.files})
        this.setState({fileName: event.target.files[0].name})
    }

    handlePriceInput = (value) => {
        this.setState({price: value})
    }

    handleDescriptionInput = (event) => {
        this.setState({description: event.target.value})
    }

    handleDateInput = (value) => {
        this.setState({dataPicker: value})
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year  + '/' + month + '/' + day;
        this.setState({date: convertDate})
    }

    handlePriceType = (event) => {
        this.setState({priceType: event.target.value})
    }

    handleSubmitPayment = async () => {
        let result = this.handleValidations();
        let payment = {
            date: this.state.date,
            unit: this.state.priceType,
            value: this.state.price,
            type: this.state.selectedType,
            paymentType: this.state.paymentType,
            description: this.state.description,
            parentId: "123",
            parentType: "Personnel",
        }
        if (this.state.fileId !== "") {
            let file = {
                file: {
                    name: this.state.fileName,
                    fileId: this.state.fileId
                }
            }
            payment = Object.assign(payment, file)
        }
        if (result) {
            this.setState({submitLoading: true})

            axios.post('https://api.saadatportal.com/api/v1/supervisor/paymentHistory', payment, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => this.setState({
                    submitLoading: false
                })).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/paymentHistory',payment, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        submitLoading: false
                                    }))
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/paymentHistory', payment, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        submitLoading: false
                                    }))
                            } else {
                                window.location = '/'
                            }
                        })
                }})

            this.setState({
                date: "",
                price: "",
                selectedType: "",
                description: "",
                fileName: "",
                fileId: "",
                isUpload: false,
            });
            this.setState({showDoneModal: true})
        }
    }
}

export default PaymentPage;