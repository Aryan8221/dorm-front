import React, { Component } from "react";
import './../../../../style/editBuilding.css';
import { BsDoorClosed } from 'react-icons/bs'
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import { TbBuilding } from 'react-icons/tb';
import { EditText, EditTextarea } from 'react-edit-text';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import CounterInput from "react-counter-input";
import { FaPencilAlt } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md"
import {MdDone} from 'react-icons/md'
import 'react-edit-text/dist/index.css';
import {Box, CircularProgress} from "@mui/material";
import {green, red} from "@mui/material/colors";
import axios from "axios";


class EditFloorAndUnit extends Component {
    state = {
        loading: false,
        floor: [],
        indexOfFloor: null,
        showDeleteModalUnit: false,
        showDeleteModalFloor: false,
        showFloorAccessory: false,
        unitTemp: {},
        floorTemp: {
            accessories:[]
        },
        floorIndex: 0,
        accIndex: -1
    }

    async componentDidMount() {
        // const response = await fetch('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name').then((response) => response.json())
        //     .then((data) => this.setState({ floor: data, isLoading: false }));

        await axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({floor: data, isLoading: false})
            }).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ floor: data, isLoading: false })
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
                                axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ floor: data, isLoading: false })
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
    }

    render() {
        return (
            <>
                <div className="p5">

                    <div className="back-btn">
                        <Link to="/dashboard/booking">
                            بازگشت
                            <i class="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="text">
                        <h4>ثبت طبقه و واحد</h4>
                        <p>
                            در این بخش ابتدا تمام طبقات به همراه واحد های موجود در هر طبقه را با نام مدنظر خود وارد نمایید و پس از اتمام
                            این مرحله در بخش بعدی اتاق ها و تخت های واقع در هر واحد را وارد می نمایید.
                        </p>
                    </div>

                    <div className="row pb-5">
                        {this.state.floor.map((f, i) => (
                            <div className="col-md-4 col-sm-6 col-xs-12 p-3">
                                <div className="floor-box">
                                    <button className="floor-close-btn" onClick={() => { this.handleDeleteShowFloor(f) }}><AiFillCloseCircle color="#F1416C" /></button>
                                    <div className="row">
                                        <div className="col-7 p-0">
                                            <div className="title">
                                                <EditText ref="floorTitle" showEditButton defaultValue={f.name} onSave={this.editFloorTitle} />
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="addAccessory">
                                                <button className="addAccessoryBtn" onClick={() => { this.hanldeFloorAccShow(f) }}>امکانات طبقه <MdAddCircle fontSize="15px" /> </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap align-items-center">
                                        {f.units.map((u) => (
                                            <div className="col-4">
                                                <div className="unit-box">
                                                    <button className="unit-close-btn" onClick={() => { this.handleDeleteShowUnit(u, i) }}><AiFillCloseCircle color="#F1416C" /></button>
                                                    <TbBuilding fontSize="2rem" />
                                                    <div className="title"><EditText className="editable" showEditButton onSave={this.editUnitTitle} defaultValue={u.number} /></div>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => { this.addUnit(f) }} className="col-4 unit-add-btn"><div className={"d-flex align-items-center"} style={{color: "#296d9a"}}>افزودن واحد<AiOutlinePlus size={25} className={"mx-2 mb-1"}/></div></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-4 p-3">
                            <div className="floor-box add">
                                <button onClick={this.addFloor} className="btn"><div className={"d-flex align-items-center"} style={{color: "#296d9a", fontSize: "1.5rem"}}>افزودن طبقه<AiOutlinePlus size={25} className={"mx-2 mb-1"}/></div></button>
                            </div>
                        </div>
                    </div>
                    <div className="register">
                        <Link to="/dashboard/booking" className="register-btn"><MdDone className='ms-1' />ثـبـت</Link>
                    </div>
                </div>

                <Modal centered show={this.state.showDeleteModalFloor} onHide={() => this.setState({showDeleteModalFloor: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف طبقه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين طبقه مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDelete"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={() => this.handleDeleteFloor()}
                            >
                                حذف
                            </Button>
                            {this.state.loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: red[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                        <button className="btn btn-light" onClick={() => this.setState({showDeleteModalFloor: false})}>بستن</button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showDeleteModalUnit} onHide={() => this.setState({showDeleteModalUnit: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف واحد</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين واحد مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDelete"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={() => this.handleDeleteUnit()}
                            >
                                حذف
                            </Button>
                            {this.state.loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: red[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                        <button className="btn btn-light" onClick={() => this.setState({showDeleteModalUnit: false})}>بستن</button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showَFloorAccessory} onHide={() => { this.handleFloorAccClose() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>اضافه کردن امکانات طبقه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="accessoryModal justify-content-center">
                        <div className="accessory-box-title d-flex"><h5>تجهیزات</h5><h5>تعداد</h5></div>
                        {this.state.floorTemp.accessories.map((accessory, i) => (
                            <div className="accessory row">
                                <div><button className="close-btn" onClick={() => { this.deleteAccessory(accessory, this.state.floorTemp) }}><AiFillCloseCircle color="#F1416C" /></button></div>
                                <div className="accessory-title col-7">
                                    <EditText style={{ backgroundColor: "#f9f9f9" }} className="editable" showEditButton defaultValue={accessory.name} onSave={this.editAccTitle} onEditMode={()=>{this.setState({accIndex : i})}} editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px" />} />
                                </div>
                                <div className="accessory-count col-5">
                                    <CounterInput min={0} max={10} count={accessory.count} onCountChange={count => {this.handleCount(count,accessory,this.state.floorTemp)}} />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => { this.addAccessory(this.state.floorTemp) }} className="accessory-add-btn"><AiOutlinePlus /></button>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={() => {this.handleSubmitAcc(this.state.floorTemp)}}>ثبت</button>
                        <button className="btn btn-light" onClick={() => { this.handleFloorAccClose()}}>بستن</button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

    addFloor = async () => {
        var count = Math.floor(Math.random() * 100) + 1;
        // const rawResponse = await fetch('https://api.saadatportal.com/api/v1/floor', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ name: `${count}`, empty: "true" })
        // });

        const rawResponse = await axios.post('https://api.saadatportal.com/api/v1/supervisor/floor', { name: `${count}`, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/floor', { name: `${count}`, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
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
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/floor', { name: `${count}`, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        var content = await rawResponse;

        const newFloor = this.state.floor.concat(
            {
                empty: true,
                id: content.id,
                name: "طبقه",
                units: []
            }
        )
        this.setState({ floor: newFloor }, () => { console.log(this.state.floor) });
    }

    addUnit = async (f) => {
        var count = Math.floor(Math.random() * 1000) + 1;
        const rawResponse = await axios.post('https://api.saadatportal.com/api/v1/supervisor/unit', { number: count, empty: "true", floorId: f.id }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/unit', { number: count, empty: "true", floorId: f.id }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
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
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/unit', { number: count, empty: "true", floorId: f.id }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const content = await rawResponse;
        const index = this.state.floor.indexOf(f);
        const newUnit = this.state.floor[index].units.concat(
            { id: content.id, empty: "true", number: 0 }
        )
        const updateFloor = [...this.state.floor]
        updateFloor[index].units = newUnit
        this.setState({ floor: updateFloor })
    }

    editFloorTitle = async ({ value, previousValue }) => {
        const floor = this.state.floor.find(({ name }) => name === previousValue);
        const index = this.state.floor.findIndex(({ name }) => name === previousValue);
        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, { name: value, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, { name: value, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
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
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, { name: value, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        // const content = await rawResponse.json();


        const updatedState = [...this.state.floor];
        updatedState[index].name = value;
        this.setState({ floor: updatedState });

    };

    editUnitTitle = async ({ value, previousValue }) => {
        let indexOfFloor = -1;
        let indexOfUnit = -1;

        for (let x = 0; x < this.state.floor.length; x++) {
            indexOfUnit = this.state.floor[x].units.findIndex(({ number }) => number === previousValue);
            if (indexOfUnit !== -1) {
                indexOfFloor = x;
                break;
            }
        }

        const updatedState = [...this.state.floor];

        const floorId = updatedState[indexOfFloor].id;
        const unitId = updatedState[indexOfFloor].units[indexOfUnit].id;
        const number = parseInt(value)

        // const rawResponse = await fetch(`https://api.saadatportal.com/api/v1/unit/${unitId}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ floorId: floorId, number: number, empty: "true" })
        // });

        // const content = await rawResponse.json();

        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, { floorId: floorId, number: number, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, { floorId: floorId, number: number, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
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
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, { floorId: floorId, number: number, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})


        updatedState[indexOfFloor].units[indexOfUnit].number = value;
        this.setState({ floor: updatedState });
    }

    deleteFloor = async (floor) => {
        this.setState({ showDeleteModal: true, loading: true});

        // await fetch(`https://api.saadatportal.com/api/v1/floor/${floor.id}`, {
        //     method: 'DELETE',
        // })
        //     .then(res => {
        //         res.text()
        //         this.setState({loading: false, showDeleteModalFloor: false})
        //     })

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({loading: false, showDeleteModalFloor: false})
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalFloor: false})
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
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalFloor: false})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const updateUsers = this.state.floor.filter(f => f !== floor);
        this.setState({ floor: updateUsers });
    }

    deleteUnit = async (unit, index) => {
        this.setState({loading: true})
        // await fetch(`https://api.saadatportal.com/api/v1/unit/${unit.id}`, {
        //     method: 'DELETE',
        // })
        //     .then(res => {
        //         res.text()
        //         this.setState({loading: false, showDeleteModalUnit: false});
        //     })

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({loading: false, showDeleteModalUnit: false});
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalUnit: false});
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
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalUnit: false});
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        let updatedState = [...this.state.floor];
        let updatedUnit = this.state.floor[index].units;
        updatedUnit = updatedUnit.filter(u => u !== unit);
        updatedState[index].units = updatedUnit;
        this.setState({ floor: updatedState });
    }

    addAccessory = async (r) => {
        const index = this.state.floor.indexOf(r);
        const newAccessory = this.state.floor[index].accessories.concat(
            { name: "....", count: 0 }
        )
        const updateState = [...this.state.floor]
        updateState[index].accessories = newAccessory
        this.setState({ floor: updateState })
    }

    editAccTitle = async ({value}) =>{
        const index = this.state.floor.indexOf(this.state.floorTemp);
        const updateState = [...this.state.floor];
        updateState[index].accessories[this.state.accIndex].name = value;
        this.setState({floor : updateState});
    }
    handleCount = (count,acc,floor) =>{

        const floorIndex = this.state.floor.indexOf(floor);
        const accIndex = this.state.floorTemp.accessories.indexOf(acc)

        const updatedState = [...this.state.floor];
        updatedState[floorIndex].accessories[accIndex].count = count;
        this.setState({floor : updatedState});

    }

    deleteAccessory = (accessory, floor) => {
        let updatedState = [...this.state.floor];
        let index = this.state.floor.indexOf(floor);
        let updatedAccessory = this.state.floor[index].accessories;

        updatedAccessory = updatedAccessory.filter(a => a !== accessory);
        updatedState[index].accessories = updatedAccessory;
        this.setState({ floor: updatedState });
    }

    handleSubmitAcc = async (floor) =>{
        const index = this.state.floor.indexOf(floor);
        const assessories = this.state.floor[index].accessories;
        console.log(assessories);

        // const rawResponse = await fetch(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({accessory : assessories})
        // });

        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.setState({showَFloorAccessory:false});
    }

    handleDeleteShowUnit = (unit, index) => {
        this.setState({ showDeleteModalUnit: true });
        this.setState({ unitTemp: unit });
        this.setState({ floorIndex: index });
    }

    handleDeleteShowFloor = (floor) => {
        this.setState({ showDeleteModalFloor: true });
        this.setState({ floorTemp: floor });
    }

    handleDeleteUnit = () => {
        this.deleteUnit(this.state.unitTemp, this.state.floorIndex);

    }
    handleDeleteFloor = () => {
        this.deleteFloor(this.state.floorTemp);
    }

    hanldeFloorAccShow = (floor) => {
        this.setState({ showَFloorAccessory: true });
        this.setState({floorTemp:floor})
    }
    handleFloorAccSubmit = () => {
        this.setState({ showَFloorAccessory: false })
    }
    handleFloorAccClose = async () => {
        // const response = await fetch('https://api.saadatportal.com/api/v1/floor').then((response) => response.json())
        //     .then((data) => this.setState({ floor: data}));

        await axios.get('https://api.saadatportal.com/api/v1/supervisor/floor', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({ floor: data})
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get('https://api.saadatportal.com/api/v1/supervisor/floor', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ floor: data})
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
                                axios.get('https://api.saadatportal.com/api/v1/supervisor/floor', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ floor: data})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.setState({ showَFloorAccessory: false })

    }
}

export default EditFloorAndUnit;