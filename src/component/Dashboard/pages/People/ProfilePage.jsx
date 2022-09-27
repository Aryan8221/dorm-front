import React, {Component, createRef} from 'react'
import '../../../../style/profilePage.css'
import default_photo from '../../../../img/default_photo.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import pdf_icon from '../../../../img/pdf_icon.png'
import png_icon from '../../../../img/png_icon.png'
import {FiUser} from "react-icons/fi";
import {AiOutlineLeft} from "react-icons/ai";
import {HiOutlineMailOpen} from 'react-icons/hi';
import {BsTelephone} from 'react-icons/bs';
import {AiOutlineBarcode} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {Modal} from 'react-bootstrap'
import {AiOutlineClose} from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'
import {Accordion} from 'react-bootstrap';
import {Table} from 'react-bootstrap';


class ProfilePage extends Component {
    state = {
        people: [
            {
                "id": "bf767aa7ebfd47e79183c99f82ac9c85",
                "firstName": "Fazel",
                "lastName": "Gheibi",
                "nationalCode": "2500533395",
                "certificateNumber": "12345",
                "phoneNumber": "09170080635",
                "address": "Fars, Lar",
                "telephoneNumber": "52336889",
                "fatherName": "Masoud",
                "emergencyNumber": "09924664362",
                "birthPlace": "Lar",
                "birthDate": "2001-07-06T06:00:00Z",
                "job": "student",
                "education": "Bachelor's degree",
                "postalCode": "74319-36864",
                "email": "fazelgheibi2001@gmail.com",
                "nationality": "Irainian",
                "maritalStatus": "single",
                "religion": "Muslims",
                "subReligion": "shia",
                "healthyStatus": "good",
                "health": true,
                "alias": "FAZ",
                "reservationDate": null,
                "university": null,
                "studentNumber": null,
                "major": null,
                "spouseFullName": null,
                "spouseFatherName": null,
                "spouseJob": null,
                "fatherJob": null,
                "parentAddress": null,
                "homeNumber": null,
                "motherPhoneNumber": null,
                "fatherPhoneNumber": null,
                "bankName": null,
                "cardNumber": null,
                "bankAccountNumber": null,
                "bankAccountOwnerName": null,
                "bankAccountShabaNumber": null,
                "bankAccountExpirationDate": null,
                "cvv2": null,
                "placeOfIssue": null
            },
        ],
        show: false,
        reportType: 'cleaning',
        report: [
            {
                "title": "cleaning",
                "date": "1",
                "description": "2"
            },
            {
                "title": "delayInArrival",
                "date": "2",
                "time": "0"
            },
            {
                "title": "exit",
                "timePeriod": {
                    "startDate": "0",
                    "endDate": ""
                },
                "destinationAddress": "0",
                "destinationPhoneNumber": "",
                "relation": ""
            },
            {
                "title": "violation",
                "date": "0",
                "time": "0",
                "description": "0"
            },
            {
                "title": "penalty",
                "typePenalty": "cash",
                "description": "0"
            },
            {
                "title": "discharge",
                "dischargeDateAnnounce": "",
                "dischargeDate": "0",
                "depositReturnDate": "",
                "deductionOfLosses": "",
                "deductionOfLossesReason": "",
                "refundableAmount": ""
            },
            {
                "title": "cancelContract",
                "data": "0",
                "reason": "0",
                "deductionOfLosses": "",
                "refundableAmount": "0"
            },
            {
                "title": "cleaning",
                "date": "1",
                "description": "2"
            },
            {
                "title": "delayInArrival",
                "date": "2",
                "time": "0"
            },
            {
                "title": "exit",
                "timePeriod": {
                    "startDate": "0",
                    "endDate": ""
                },
                "destinationAddress": "0",
                "destinationPhoneNumber": "",
                "relation": ""
            },
            {
                "title": "violation",
                "date": "0",
                "time": "0",
                "description": "0"
            },
            {
                "title": "penalty",
                "typePenalty": "cash",
                "description": "0"
            },
            {
                "title": "discharge",
                "dischargeDateAnnounce": "",
                "dischargeDate": "0",
                "depositReturnDate": "",
                "deductionOfLosses": "",
                "deductionOfLossesReason": "",
                "refundableAmount": ""
            },
            {
                "title": "cancelContract",
                "data": "0",
                "reason": "0",
                "deductionOfLosses": "",
                "refundableAmount": "0"
            },
            {
                "title": "cleaning",
                "date": "1",
                "description": "2"
            },
            {
                "title": "delayInArrival",
                "date": "2",
                "time": "0"
            },
            {
                "title": "exit",
                "timePeriod": {
                    "startDate": "0",
                    "endDate": ""
                },
                "destinationAddress": "0",
                "destinationPhoneNumber": "",
                "relation": ""
            },
            {
                "title": "violation",
                "date": "0",
                "time": "0",
                "description": "0"
            },
            {
                "title": "penalty",
                "typePenalty": "cash",
                "description": "0"
            },
            {
                "title": "discharge",
                "dischargeDateAnnounce": "",
                "dischargeDate": "0",
                "depositReturnDate": "",
                "deductionOfLosses": "",
                "deductionOfLossesReason": "",
                "refundableAmount": ""
            },
            {
                "title": "cancelContract",
                "data": "0",
                "reason": "0",
                "deductionOfLosses": "",
                "refundableAmount": "0"
            },
            {
                "title": "cleaning",
                "date": "1",
                "description": "2"
            },
            {
                "title": "delayInArrival",
                "date": "2",
                "time": "0"
            },
            {
                "title": "exit",
                "timePeriod": {
                    "startDate": "0",
                    "endDate": ""
                },
                "destinationAddress": "0",
                "destinationPhoneNumber": "",
                "relation": ""
            },
            {
                "title": "violation",
                "date": "0",
                "time": "0",
                "description": "0"
            },
            {
                "title": "penalty",
                "typePenalty": "cash",
                "description": "0"
            },
            {
                "title": "discharge",
                "dischargeDateAnnounce": "",
                "dischargeDate": "0",
                "depositReturnDate": "",
                "deductionOfLosses": "",
                "deductionOfLossesReason": "",
                "refundableAmount": ""
            },
            {
                "title": "cancelContract",
                "data": "0",
                "reason": "0",
                "deductionOfLosses": "",
                "refundableAmount": "0"
            },
            {
                "title": "cleaning",
                "date": "1",
                "description": "2"
            },
            {
                "title": "delayInArrival",
                "date": "2",
                "time": "0"
            },
            {
                "title": "exit",
                "timePeriod": {
                    "startDate": "0",
                    "endDate": ""
                },
                "destinationAddress": "0",
                "destinationPhoneNumber": "",
                "relation": ""
            },
            {
                "title": "violation",
                "date": "0",
                "time": "0",
                "description": "0"
            },
            {
                "title": "penalty",
                "typePenalty": "cash",
                "description": "0"
            },
            {
                "title": "discharge",
                "dischargeDateAnnounce": "",
                "dischargeDate": "0",
                "depositReturnDate": "",
                "deductionOfLosses": "",
                "deductionOfLossesReason": "",
                "refundableAmount": ""
            },
            {
                "title": "cancelContract",
                "data": "0",
                "reason": "0",
                "deductionOfLosses": "",
                "refundableAmount": "0"
            }
        ],
        showDeleteModalReport : false,
        reportTemp:[]
    }
    date = createRef();
    description = createRef();
    time = createRef();
    startDate = createRef();
    endDate = createRef();
    destinationAddress = createRef();
    destinationPhoneNumber = createRef();
    relation = createRef();
    typePenalty = createRef();
    dischargeDateAnnounce = createRef();
    dischargeDate = createRef();
    depositReturnDate = createRef();
    deductionOfLosses = createRef();
    deductionOfLossesReason = createRef();
    refundableAmount = createRef();
    reason = createRef();


    render() {
        return (
            <>
                <div className='profile-container row'> {/*given photo*/}
                    <div className='image-container'>
                        <div className="d-flex flex-row justify-content-around align-items-center w-100">
                            <img
                                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                                alt="profile"/>
                            {this.state.people.map(p => (
                                <div className='information d-flex flex-row'>
                                    <div className='ms-5'>
                                        <div className='col p-2'>
                                            <AiOutlineUser className='ms-2'/>
                                            <label> نام :</label>
                                            {p.firstName}
                                        </div>
                                        <div className='col p-2'>
                                            <AiOutlineUser className='ms-2'/>
                                            <label> نام خانوادگی :</label>
                                            {p.lastName}
                                        </div>
                                        <div className='col p-2'>
                                            <AiOutlineBarcode className='ms-2'/>
                                            <label> کد ملی :</label>
                                            {p.nationalCode}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='col p-2'>
                                            <BsTelephone className='ms-2'/>
                                            <label> شماره تلفن :</label>
                                            {p.phoneNumber}
                                        </div>
                                        <div className='col p-2'>
                                            <HiOutlineMailOpen className='ms-2'/>
                                            <label> ایمیل :</label>
                                            {p.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='tab-container'>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="records" title="سوابق">
                                <button className='btn-add-report' onClick={() => {
                                    this.handleShow()
                                }}>ثبت گزارش
                                </button>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>نوبت نظافت شبانه</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    {/*<th>شماره</th>*/}
                                                    <th>تاریخ</th>
                                                    <th>توضیحات</th>
                                                    <th>عملیات</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.report.map((c,i) => (
                                                        c.title === 'cleaning' ? (
                                                                <tr>
                                                                    {/*<td>{a+1}</td>*/}
                                                                    <td>{c.date}</td>
                                                                    <td>{c.description}</td>
                                                                    <td><button className='btn floor-close-btn' onClick={ () => this.handleOpenModalReport(c) }><AiFillCloseCircle color="#F1416C" /></button></td>
                                                                </tr>
                                                        ) : (
                                                                console.log()
                                                        )
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>تأخیر در ورود</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    {/*<th>شماره</th>*/}
                                                    <th>تاریخ</th>
                                                    <th>ساعت</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.report.map((d,i) => (

                                                        d.title === 'delayInArrival' ? (
                                                            <tr>
                                                                {/*<td>{i+1}</td>*/}
                                                                <td>{d.date}</td>
                                                                <td>{d.time}</td>
                                                            </tr>
                                                        ) : (
                                                            console.log()
                                                        )
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>خروج</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    {/*<th>شماره</th>*/}
                                                    <th>از تاريخ</th>
                                                    <th>تا تاريخ</th>
                                                    <th>آدرس مقصد</th>
                                                    <th>شماره تماس مقصد</th>
                                                    <th>نسبت</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.report.map((e,i) => (

                                                        e.title === 'exit' ? (
                                                            <tr>
                                                                {/*<td>{i+1}</td>*/}
                                                                <td>{e.startDate}</td>
                                                                <td>{e.endDate}</td>
                                                                <td>{e.destinationAddress}</td>
                                                                <td>{e.destinationPhoneNumber}</td>
                                                                <td>{e.relation}</td>
                                                            </tr>
                                                        ) : (
                                                            console.log()
                                                        )
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>ثبت تخلف</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    {/*<th>شماره</th>*/}
                                                    <th>گزارش تخلف</th>
                                                    <th>تاریخ</th>
                                                    <th>ساعت</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.report.map((v,i) => (

                                                        v.title === 'violation' ? (
                                                            <tr>
                                                                {/*<td>{i+1}</td>*/}
                                                                <td>{v.description}</td>
                                                                <td>{v.date}</td>
                                                                <td>{v.time}</td>
                                                            </tr>
                                                        ) : (
                                                            console.log()
                                                        )
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>ثبت جریمه</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    {/*<th>شماره</th>*/}
                                                    <th>دلیل جریمه</th>
                                                    <th>نوع جریمه</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.report.map((p,i) => (

                                                        p.title === 'penalty' ? (
                                                            <tr>
                                                                {/*<td>{i+1}</td>*/}
                                                                <td>{p.description}</td>
                                                                <td>{p.typePenalty}</td>
                                                            </tr>
                                                        ) : (
                                                            console.log()
                                                        )
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>اعلام تخلیه</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    {/*<th>شماره</th>*/}
                                                    <th>تاریخ اعلام تخلیه</th>
                                                    <th>تاریخ تخلیه</th>
                                                    <th>تاریخ عودت ودیعه</th>
                                                    <th>کسر ضرر و زیان</th>
                                                    <th>علت کسر ضر و زیان</th>
                                                    <th>مبلغ قابل عودت</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.report.map((d,i) => (

                                                        d.title === 'discharge' ? (
                                                            <tr>
                                                                {/*<td>{i+1}</td>*/}
                                                                <td>{d.dischargeDateAnnounce}</td>
                                                                <td>{d.dischargeDate}</td>
                                                                <td>{d.depositReturnDate}</td>
                                                                <td>{d.deductionOfLosses}</td>
                                                                <td>{d.deductionOfLossesReason}</td>
                                                                <td>{d.refundableAmount}</td>
                                                            </tr>
                                                        ) : (
                                                            console.log()
                                                        )
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>لغو قرارداد</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    {/*<th>شماره</th>*/}
                                                    <th>تاریخ</th>
                                                    <th>علت</th>
                                                    <th>کسر ضرر و زیان</th>
                                                    <th>مبلغ قابل عودت</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.report.map((cc,i) => (

                                                        cc.title === 'cancelContract' ? (
                                                            <tr>
                                                                {/*<td>{i+1}</td>*/}
                                                                <td>{cc.date}</td>
                                                                <td>{cc.reason}</td>
                                                                <td>{cc.deductionOfLosses}</td>
                                                                <td>{cc.refundableAmount}</td>
                                                            </tr>
                                                        ) : (
                                                            console.log()
                                                        )
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab>
                            <Tab eventKey="documents" title="مدارک">
                                <img className='test' src={pdf_icon}/>
                                <img className='test' src={pdf_icon}/>
                                <img className='test' src={pdf_icon}/>
                                <img className='test' src={png_icon}/>
                                <img className='test' src={png_icon}/>
                                <img className='test' src={png_icon}/>
                            </Tab>
                            <Tab eventKey="more-information" title="اطلاعات بیشتر">
                                {this.state.people.map(p => (
                                    <div className='information d-flex flex-row flex-wrap'>
                                        <p className='col-4'>
                                            <label> نام :</label>
                                            {p.firstName}
                                        </p>
                                        <p className='col-4'>
                                            <label> نام خانوادگی :</label>
                                            {p.lastName}
                                        </p>
                                        <p className='col-4'>
                                            <label> کد ملی :</label>
                                            {p.nationalCode}
                                        </p>
                                        <p className='col-4'>
                                            <label> شماره گواهی :</label>
                                            {p.certificateNumber}
                                        </p>
                                        <p className='col-4'>
                                            <label> شماره تماس :</label>
                                            {p.phoneNumber}
                                        </p>
                                        <p className='col-4'>
                                            <label> آدرس :</label>
                                            {p.address}
                                        </p>
                                        <p className='col-4'>
                                            <label> شماره تلفن :</label>
                                            {p.telephoneNumber}
                                        </p>
                                        <p className='col-4'>
                                            <label> نام پدر :</label>
                                            {p.fatherName}
                                        </p>
                                        <p className='col-4'>
                                            <label> شماره تلفن اضطراری :</label>
                                            {p.emergencyNumber}
                                        </p>
                                        <p className='col-4'>
                                            <label> محل تولد :</label>
                                            {p.birthPlace}
                                        </p>
                                        <p className='col-4'>
                                            <label> تاریخ تولد :</label>
                                            {p.birthDate}
                                        </p>
                                        <p className='col-4'>
                                            <label> شغل :</label>
                                            {p.job}
                                        </p>
                                        <p className='col-4'>
                                            <label> تحصیلات :</label>
                                            {p.education}
                                        </p>
                                        <p className='col-4'>
                                            <label> کد پستی :</label>
                                            {p.postalCode}
                                        </p>
                                        <p className='col-4'>
                                            <label> ایمیل :</label>
                                            {p.email}
                                        </p>
                                        <p className='col-4'>
                                            <label>  ملیت :</label>
                                            {p.nationality}
                                        </p>
                                        <p className='col-4'>
                                            <label> وضعیت تاهل :</label>
                                            {p.maritalStatus}
                                        </p>
                                        <p className='col-4'>
                                            <label> دین :</label>
                                            {p.religion}
                                        </p>
                                        <p className='col-4'>
                                            <label> مذهب :</label>
                                            {p.subReligion}
                                        </p>
                                        <p className='col-4'>
                                            <label> وضعیت سلامتی :</label>
                                            {p.healthyStatus}
                                        </p>
                                        <p className='col-4'>
                                            <label> نام مستعار :</label>
                                            {p.alias}
                                        </p>
                                       {/* <div className='ms-5'>
                                            <p>
                                                <label> نام :</label>
                                                {p.firstName}
                                            </p>
                                            <p>
                                                <label> نام خانوادگی :</label>
                                                {p.lastName}
                                            </p>
                                            <p>
                                                <label> کد ملی :</label>
                                                {p.nationalCode}
                                            </p>
                                            <p>
                                                <label> تاریخ شروع پذیرش :</label>
                                                11/22/3333
                                            </p>
                                            <p>
                                                <label> تاریخ اتمام پذیرش :</label>
                                                11/22/3333
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <label> دانشگاه محل تحصیل :</label>
                                                {p.firstName}
                                            </p>
                                            <p>
                                                <label> شماره دانشجویی :</label>
                                                {p.lastName}
                                            </p>
                                            <p>
                                                <label> نام پدر :</label>
                                                {p.nationalCode}
                                            </p>
                                            <p>
                                                <label> شغل پدر :</label>
                                                11/22/3333
                                            </p>
                                            <p>
                                                <label> وضعیت تاهل :</label>
                                                مجرد
                                            </p>
                                        </div>*/}
                                    </div>
                                ))}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <Modal className='report-modal' centered show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title><span>ثبت گزارش</span></Modal.Title>
                        <button className='btn' onClick={() => {
                            this.handleClose()
                        }}><AiOutlineClose/></button>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="my-3 mx-2" onSubmit={this.handleSubmit}>
                            <div className='input-report-box'>
                                <select className='input' onChange={this.reportType}>
                                    <option value='cleaning'>نوبت نظافت شبانه</option>
                                    <option value='delayInArrival'>تأخیر در ورود</option>
                                    <option value='exit'>خروج</option>
                                    <option value='violation'>ثبت تخلف</option>
                                    <option value='penalty'>ثبت جریمه</option>
                                    <option value='discharge'>اعلام تخلیه</option>
                                    <option value='cancelContract'>لغو قرارداد</option>
                                </select>
                                <label className="placeholder">نوع گزارش</label>
                            </div>
                            {(() => {
                                switch (this.state.reportType) {
                                    case 'cleaning':
                                        return <>
                                            {/*<div className='input-report-box'>
                                                <input type="text"  className="input" placeholder=" "/>
                                                <label className="placeholder">روز</label>
                                            </div>*/}
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.date} className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.description} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">توضیحات</label>
                                            </div>
                                        </>;
                                    case 'delayInArrival':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.date} className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.time} className="input" placeholder=" "/>
                                                <label className="placeholder">ساعت</label>
                                            </div>
                                        </>;
                                    case 'exit':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.startDate} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">از تاريخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.endDate} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">تا تاريخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.destinationAddress} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">آدرس مقصد</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.destinationPhoneNumber} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">شماره تماس مقصد</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.relation} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">نسبت</label>
                                            </div>
                                        </>;
                                    case 'violation':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.description} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">گزارش تخلف</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.date} className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.time} className="input" placeholder=" "/>
                                                <label className="placeholder">ساعت</label>
                                            </div>
                                        </>;
                                    case 'penalty':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.description} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">دلیل جریمه</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <select ref={this.typePenalty} className='input'>
                                                    <option value='cash'>نقدی</option>
                                                    <option value='punishment'>تنبیهی</option>
                                                </select>
                                                <label className="placeholder">نوع جریمه</label>
                                            </div>
                                        </>;
                                    case 'discharge':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.dischargeDateAnnounce} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">تاریخ اعلام تخلیه</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.dischargeDate} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">تاریخ تخلیه</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.depositReturnDate} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">تاریخ عودت ودیعه</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.deductionOfLosses} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">کسر ضرر و زیان</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.deductionOfLossesReason} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">علت کسر ضر و زیان</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.refundableAmount} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">مبلغ قابل عودت</label>
                                            </div>
                                        </>;
                                    case 'cancelContract':
                                        return <>
                                            {/*<div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">روز</label>
                                            </div>*/}
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.date} className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.reason} className="input" placeholder=" "/>
                                                <label className="placeholder">علت</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.deductionOfLosses} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">کسر ضرر و زیان</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.refundableAmount} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">مبلغ قابل عودت</label>
                                            </div>
                                        </>
                                }
                            })()}
                            <div className="input-report-box">
                                <button className='btn btn-record-report'>ثبت</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal centered show={this.state.showDeleteModalReport}>
                    <Modal.Header>
                        <Modal.Title>حذف گزارش</Modal.Title>
                        <button className='btn' onClick={() => {
                            this.handleCloseModalReport()
                        }}><AiOutlineClose/></button>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين گزارش مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-around">
                        <button className="btn btn-danger" onClick={() => this.handleDeleteReport()}>حذف</button>
                        <button className="btn btn-light" onClick={() => this.handleCloseModalReport()}>بستن</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleClose = () => {
        this.setState({show: false})
    };
    handleShow = () => {
        this.setState({show: true})
    };
    reportType = (e) => {
        const type = e.target.value
        this.setState({reportType: type})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const type = this.state.reportType;
        this.setState({reports: type})
        switch (type) {
            case 'cleaning':
                return (() => {
                    const date = this.date.current.value;
                    const description = this.description.current.value;
                    const result = {
                        'title': this.state.reportType,
                        'date': date,
                        'description': description
                    }
                    const newReports = this.state.report.concat(result);
                    this.setState({report: newReports});
                    this.setState({show: false});
                })();
            case 'delayInArrival':
                return (() => {
                    const date = this.date.current.value;
                    const time = this.time.current.value;
                    const result = {
                        'title': this.state.reportType,
                        'date': date,
                        'time': time
                    }
                    const newReports = this.state.report.concat(result)
                    this.setState({report: newReports})
                    this.setState({show: false})
                    console.log(this.state.report);
                })();
            case 'exit':
                return (() => {
                    const startDate = this.startDate.current.value;
                    const endDate = this.endDate.current.value;
                    const destinationAddress = this.destinationAddress.current.value;
                    const destinationPhoneNumber = this.destinationPhoneNumber.current.value;
                    const relation = this.relation.current.value;
                    const result = {
                        'title': this.state.reportType,
                        'timePeriod': {
                            "startDate": startDate,
                            "endDate": endDate
                        },
                        'destinationAddress': destinationAddress,
                        'destinationPhoneNumber': destinationPhoneNumber,
                        'relation': relation
                    }
                    const newReports = this.state.report.concat(result)
                    this.setState({report: newReports})
                    this.setState({show: false})
                })();
            case 'violation':
                return (() => {
                    const date = this.date.current.value;
                    const time = this.time.current.value;
                    const description = this.description.current.value;
                    const result = {
                        'title': this.state.reportType,
                        'date': date,
                        'time': time,
                        'description': description
                    }
                    const newReports = this.state.report.concat(result)
                    this.setState({report: newReports})
                    this.setState({show: false})
                })();
            case 'penalty':
                return (() => {
                    const description = this.description.current.value;
                    const typePenalty = this.typePenalty.current.value;
                    const result = {
                        'title': this.state.reportType,
                        'typePenalty': typePenalty,
                        'description': description
                    }
                    const newReports = this.state.report.concat(result)
                    this.setState({report: newReports})
                    this.setState({show: false})
                })();
            case 'discharge':
                return (() => {
                    const dischargeDateAnnounce = this.dischargeDateAnnounce.current.value;
                    const dischargeDate = this.dischargeDate.current.value;
                    const depositReturnDate = this.depositReturnDate.current.value;
                    const deductionOfLosses = this.deductionOfLosses.current.value;
                    const deductionOfLossesReason = this.deductionOfLossesReason.current.value;
                    const refundableAmount = this.refundableAmount.current.value;
                    const result = {
                        'title': this.state.reportType,
                        'dischargeDateAnnounce': dischargeDateAnnounce,
                        'dischargeDate': dischargeDate,
                        'depositReturnDate': depositReturnDate,
                        'deductionOfLosses': deductionOfLosses,
                        'deductionOfLossesReason': deductionOfLossesReason,
                        'refundableAmount': refundableAmount
                    }
                    const newReports = this.state.report.concat(result)
                    this.setState({report: newReports})
                    this.setState({show: false})
                })();
            case 'cancelContract':
                return (() => {
                    const date = this.date.current.value;
                    const reason = this.reason.current.value;
                    const deductionOfLosses = this.deductionOfLosses.current.value;
                    const refundableAmount = this.refundableAmount.current.value;
                    const result = {
                        'title': this.state.reportType,
                        'data': date,
                        'reason': reason,
                        'deductionOfLosses': deductionOfLosses,
                        'refundableAmount': refundableAmount
                    }
                    const newReports = this.state.report.concat(result)
                    this.setState({report: newReports})
                    this.setState({show: false})
                })();
        }
    }
    handleOpenModalReport = (report) => {
        const index = this.state.report.indexOf(report)
        this.setState({ showDeleteModalReport: true })
        this.setState({ reportTemp: report })
        console.log(this.state.reportTemp)
        // this.handleDeleteReport(report,index)
    }
    handleCloseModalReport = () => {
        this.setState({ showDeleteModalReport: false });
    }
    handleDeleteReport = () => {
        console.log('u')
    }
}

export default ProfilePage