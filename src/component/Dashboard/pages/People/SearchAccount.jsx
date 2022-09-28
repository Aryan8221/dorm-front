import React, {Component} from 'react'
import '../../../../style/searchAccount.css'
import {Accordion} from "react-bootstrap";
import png_icon from "../../../../img/png_icon.png";
import pdf_icon from "../../../../img/pdf_icon.png";
import {IoIosSearch} from "react-icons/io";
import {FiUser} from "react-icons/fi";
import {AiOutlineBarcode, AiOutlineUser} from "react-icons/ai";
import {BsTelephone} from "react-icons/bs";
import {HiOutlineMailOpen} from "react-icons/hi";
import {Link} from "react-router-dom"

class SearchAccount extends Component {
    state = {
        placeholder: '',
        accountFound: [
            {
                "name": "ali",
                "phone": "09123231",
                "email": "asd@gmail.com",
                "nationalCode": "12312313"
            },
            {
                "name": "ali",
                "phone": "09123231",
                "email": "asd@gmail.com",
                "nationalCode": "12312313"
            },
            {
                "name": "ali",
                "phone": "09123231",
                "email": "asd@gmail.com",
                "nationalCode": "12312313"
            },
            {
                "name": "ali",
                "phone": "09123231",
                "email": "asd@gmail.com",
                "nationalCode": "12312313"
            }
        ]
    }

    render() {
        return (
            <>
                <div className='search-container'>
                    <label htmlFor="orders" className='m-2'>براساس:</label>
                    <select className='form-select ms-3' style={{width: '20%'}} name="order" form="order-form"
                            onChange={this.handlePlaceHolder}>
                        <option value="national-code">کدملی</option>
                        <option value="name">نام</option>
                        <option value="phone-number">شماره تلفن</option>
                    </select>

                    <input className="form-control ms-3" type='text'
                           placeholder='جستجو'/> {/*placeholder = {this.state.placeholder}*/}
                    {/*<Accordion defaultActiveKey="0" className='col-3'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>بر اساس</Accordion.Header>
                                <Accordion.Body>
                                    <form>
                                        <input type="radio" name="order" value="national-code" className='m-2'/>
                                            <label>کدملی</label><br />
                                        <input type="radio" name="order" value="name" className='m-2'/>
                                            <label>نام</label><br />
                                        <input type="radio" name="order" value="phone-number" className='m-2'/>
                                            <label>شماره تلفن</label>
                                    </form>

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>*/}
                    <button className='btn btn-outline-primary ms-3'><IoIosSearch size={30} className='search-logo'/>
                    </button>
                </div>
                <div className='result'>
                    {this.state.accountFound.map(accountFound => (
                        <>
                            <Link to="profile" className='account-found-link'>
                                <div className='account-found mb-3 d-flex flex-column flex-md-row'>
                                    {/*<FiUser size={80} style={{ marginLeft: '5%', marginTop: '1%' }} />*/}
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBnUckFxDVe5FOT5vuVfWCvWWY1pUrOPBOFPu9CNZYpABJSYPCigxy9rEc32E6mBamw3c&usqp=CAU"
                                        style={{
                                            marginLeft: '5%',
                                            marginTop: '1%',
                                            marginBottom: '16px',
                                            width: "200px",
                                            height: "200px",
                                            borderRadius: "100%"
                                        }}/>
                                    <div className='ms-5'>
                                        <div className='col p-2'>
                                            <AiOutlineUser className='ms-2'/>
                                            <label> نام :</label>
                                            {accountFound.name}
                                        </div>
                                        <div className='col p-2'>
                                            <AiOutlineUser className='ms-2'/>
                                            <label> نام خانوادگی :</label>
                                            {accountFound.name}
                                        </div>
                                        <div className='col p-2'>
                                            <AiOutlineBarcode className='ms-2'/>
                                            <label> کد ملی :</label>
                                            {accountFound.nationalCode}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='col p-2'>
                                            <BsTelephone className='ms-2'/>
                                            <label> شماره تلفن :</label>
                                            {accountFound.phone}
                                        </div>
                                        <div className='col p-2'>
                                            <HiOutlineMailOpen className='ms-2'/>
                                            <label> ایمیل :</label>
                                            {accountFound.email}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>
                    ))}
                    &nbsp;
                </div>
            </>
        );
    }

    handlePlaceHolder = () => {
        this.setState({placeHolder: '123'})
        console.log(this.state.placeholder)
    }
}

export default SearchAccount;