import React, {Component} from "react";
import '../../../../style/contacts.css'
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import {Box, Button, CircularProgress} from "@mui/material";
import {green} from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";

class contacts extends Component {
    state = {
        searchLoading: true,
        loading :false,
        contacts: [],
        show: false,
        inputTelephone: [],
        inputMobile: [],
        name: [],
        telephoneNumbers: [],
        mobileNumbers: [],
        searchType:"name",
    }

    async componentDidMount() {
        const response = await fetch('https://api.saadatportal.com/api/v1/phoneBook').then((response) => response.json())
            .then((data) => this.setState({contacts : data, searchLoading: false}));
    }
    render() {
        return (
            <>
                <div className="contact">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div className="title">دفترچه تلفن</div>
                        <button className='btn-done my-4' onClick={() => {
                            this.handleShow()
                        }}><AiOutlinePlus className='ms-2'/>افزودن مخاطب
                        </button>handleShow
                    </div>
                    <div className="search-box">
                        <div className="form-floating">
                            <select className="form-select" id="floatingSelect"
                                    aria-label="Floating label select example"
                                    value={this.state.searchType}
                                    onChange={(value) => this.setState({searchType: value.target.value})}>
                                <option value="name">نام و نام خانوادگی</option>
                                <option value="mobileNumbers">شماره همراه</option>
                                <option value="telephoneNumbers"> تلفن ثابت</option>
                            </select>
                            <label htmlFor="floatingSelect">براساس</label>
                        </div>
                        <input type="text"
                               id="inputSearch"
                               placeholder="جسـتجـو..."
                               onChange={(e) => {
                                   this.handleSearchInput(e)
                               }}/>
                        <div className="search-icon"><i className="bi bi-search"></i></div>
                    </div>
                    <div className="table-box">
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>نام و نام خانوادگی</th>
                                <th>تلفن همراه</th>
                                <th>تلفن ثابت</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.searchLoading ?
                                [...Array(5)].map((x, i) =>
                                    <tr>
                                        <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                        <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                        <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                    </tr>
                                )
                                :
                                this.state.contacts.map((i) => (
                                    <tr>
                                        <td>{i.name}</td>
                                        <td >{i.mobileNumbers.map((num)=>(<div className="mb-2">{num}</div>))}</td>
                                        <td>{i.telephoneNumbers.map((num)=>(<div className="mb-2">{num}</div>))}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal className='report-modal' centered show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title><span>ثبت مخاطب</span></Modal.Title>
                        <button className='btn' onClick={() => {
                            this.handleClose()
                        }}><AiOutlineClose/></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='input-group-register mb-3'>
                            <input type='text' className='input form-control' onChange={(e) => {
                                this.getValueInputName(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>نام و نام خانوادگی</label>
                        </div>

                        <div className='input-group-register mb-3'>
                            <input type='text' className='input form-control' onChange={(e) => {
                                this.getValueInputTelephone(e.target.value,0)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>تلفن ثابت</label>
                        </div>

                        {
                            this.state.inputTelephone.map((telephone, index) => (
                                <div className='input-group-register mb-3'>
                                    <AiOutlineClose className='btn-delete-input' onClick={() => {this.deleteInputTelephone(index)}}/>
                                    <input type='text' className='input form-control' onChange={(e) => {
                                        this.getValueInputTelephone(e.target.value, index+1)
                                    }}/>
                                    <label className="placeholder" style={{right: '12px'}}>تلفن ثابت</label>
                                </div>
                            ))
                        }
                        <div className="add-input-contact mb-3" onClick={() => {
                            this.addInputTelephoneNumbers()
                        }}>
                            <AiOutlinePlus className='ms-2'/>
                        </div>



                        <div className='input-group-register mb-3'>
                            <input type='text' className='input form-control' onChange={(e) => {
                                this.getValueInputMobile(e.target.value,0)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>تلفن همراه</label>
                        </div>
                        {
                            this.state.inputMobile.map((mobile, index) => (
                                <div className='input-group-register mb-3'>
                                    <AiOutlineClose className='btn-delete-input' onClick={() => {this.deleteInputMobile(index)}}/>
                                    <input type='text' className='input form-control' onChange={(e) => {
                                        this.getValueInputMobile(e.target.value, index+1)
                                    }}/>
                                    <label className="placeholder" style={{right: '12px'}}>تلفن همراه</label>
                                </div>
                            ))
                        }
                        <div className="add-input-contact mb-3" onClick={() => {
                            this.addInputMobileNumbers()
                        }}>
                            <AiOutlinePlus className='ms-2'/>
                        </div>

                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone w-100"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={this.handleRecordContact}
                            >
                                ثبت
                            </Button>
                            {this.state.loading && (
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
                        {/*<button className='btn-done w-100' onClick={() => {*/}
                        {/*    this.handleRecordContact()*/}
                        {/*}}>ثبت*/}
                        {/*</button>*/}



                    </Modal.Body>
                </Modal>
            </>
        );
    }

    handleSearchInput = async (e) => {
        const value = e.target.value;
        this.setState({searchLoading: true})
        const response = await fetch(`https://api.saadatportal.com/api/v1/phoneBook/search?${this.state.searchType}=${e.target.value}`).then((response) => response.json())
            .then((data) => this.setState({contacts: data, searchLoading: false}));
    }

    handleClose = () => {
        this.setState({show: false})
    };

    handleShow = () => {
        this.setState({show: true})
    }

    addInputTelephoneNumbers = () => {
        const newInputTelephone = this.state.inputTelephone.concat(
            ""
        )
        this.setState({inputTelephone: newInputTelephone});
    }

    addInputMobileNumbers = () => {
        const newInputMobile = this.state.inputMobile.concat(
            ""
        )
        this.setState({inputMobile: newInputMobile});
    }

    getValueInputName = (e) => {
        const name = e;
        this.setState({name: name})
    }
    getValueInputTelephone = (e, index) => {
        const updateTelephone = [...this.state.telephoneNumbers];
        updateTelephone[index] = e;
        this.setState({telephoneNumbers: updateTelephone});
    }

    getValueInputMobile = (e, index) => {
        const updateMobile = [...this.state.mobileNumbers];
        updateMobile[index] = e;
        this.setState({mobileNumbers: updateMobile});
    }

    deleteInputTelephone = (i) => {
        const updateInputsTelephone = [...this.state.inputTelephone];
        updateInputsTelephone.splice(i,1)
        this.setState({inputTelephone: updateInputsTelephone});
    }

    deleteInputMobile = (i) => {
        const updateInputsMobile = [...this.state.inputMobile];
        updateInputsMobile.splice(i,1);
        this.setState({inputMobile: updateInputsMobile});
    }

    handleRecordContact = async () => {
        const newContact = {
            name: this.state.name,
            telephoneNumbers : this.state.telephoneNumbers,
            mobileNumbers: this.state.mobileNumbers
        }
        this.setState({loading: true})
        const rawResponse = await fetch('https://api.saadatportal.com/api/v1/phoneBook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        }).then(() => {this.setState({loading: false})}).catch(() => this.setState({loading: false}));

        const response = await fetch('https://api.saadatportal.com/api/v1/phoneBook').then((response) => response.json())
            .then((data) => this.setState({contacts : data}));

        this.setState({show: false});
        this.setState({inputTelephone:[]});
        this.setState({inputMobile:[]});
        this.setState({telephoneNumbers:[]});
        this.setState({mobileNumbers:[]});
    }


}

export default contacts;